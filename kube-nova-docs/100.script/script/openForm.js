// openForm.js
// Templater 用户脚本 - 调用 Modal Form 插件
// 功能：创建 VitePress 文章，智能读取目录配置

async function openForm(formName) {
  // 获取 Modal Form 插件 API
  const modalForm = app.plugins.plugins.modalforms?.api

  if (!modalForm) {
    new Notice('未找到 Modal Form 插件！')
    console.error('Modal Form plugin not found')
    return null
  }

  try {
    // 获取当前文件信息
    const activeFile = app.workspace.getActiveFile()
    const currentPath = activeFile ? activeFile.path : ''
    const currentFolder = activeFile?.parent?.path || ''

    // 获取所有文件夹
    const allFolders = getAllFolders()

    // ==================== 核心逻辑 ====================

    // 1. 找到顶级目录（第一层文件夹）
    const topLevelFolder = getTopLevelFolder(currentFolder)

    // 2. 读取顶级目录下的 目录.md（获取 permalink 前缀）
    const catalogConfig = await readCatalogMd(topLevelFolder)

    // 3. 读取当前文件夹下的 Info.md（获取 categories 和 tags）
    const infoConfig = await readInfoMd(currentFolder)

    // 4. 解析路径获取回退默认值
    const pathInfo = parsePathInfo(currentPath)

    // ==================== 确定默认值 ====================

    // permalink 前缀：从 目录.md 读取，默认为空
    const permalinkPrefix = catalogConfig.permalink || ''

    // 分类：优先 99.Info 的 categories，否则用路径解析
    const defaultCategory = infoConfig.categories || pathInfo.category

    // 标签：优先 99.Info 的 tags，否则用路径解析
    const defaultTags = infoConfig.tags || pathInfo.tag

    // 默认后缀：时间戳
    const defaultSuffix = generateTimestamp()

    // 构建文件夹选项
    const folderOptions = allFolders.map(function (f) {
      return {
        value: f,
        label: f || '/ (根目录)'
      }
    })

    // ==================== 表单定义 ====================
    const formDefinition = {
      title: '创建 VitePress 文章',
      fields: [
        {
          name: 'targetFolder',
          label: '保存位置',
          description: '选择文件保存的文件夹',
          input: {
            type: 'select',
            source: 'fixed',
            options: folderOptions
          }
        },
        {
          name: 'fileName',
          label: '文件名',
          description: '文件名（不含 .md 后缀）',
          input: { type: 'text' }
        },
        {
          name: 'permalinkSuffix',
          label: '永久链接后缀',
          description: `完整链接: ${permalinkPrefix}/<后缀>（默认为时间戳，可自定义）`,
          input: { type: 'text' }
        },
        {
          name: 'category',
          label: '分类',
          description: '文章分类（多个用逗号分隔）',
          input: { type: 'text' }
        },
        {
          name: 'tags',
          label: '标签',
          description: '文章标签（多个用逗号分隔）',
          input: { type: 'text' }
        }
      ]
    }

    // 默认值
    const defaultValues = {
      targetFolder: currentFolder,
      permalinkSuffix: defaultSuffix,
      category: defaultCategory,
      tags: defaultTags
    }

    // 打开表单并返回结果
    var result = await modalForm.openForm(formDefinition, { values: defaultValues })

    // ==================== 处理结果，附加额外信息 ====================
    if (result) {
      // 将 permalinkPrefix 附加到结果中，供模板使用
      result._permalinkPrefix = permalinkPrefix
    }

    return result
  } catch (e) {
    console.error('Modal Form error:', e)
    new Notice('表单打开失败: ' + e.message)
    return null
  }
}

// ==================== 辅助函数 ====================

/**
 * 获取顶级目录（路径的第一层文件夹）
 * 例如：01.指南/01.简介 -> 01.指南
 */
function getTopLevelFolder(folderPath) {
  if (!folderPath || typeof folderPath !== 'string') {
    return ''
  }
  const parts = folderPath.split('/').filter((p) => p)
  return parts[0] || ''
}

/**
 * 读取顶级目录下的 目录.md，提取 permalink
 */
async function readCatalogMd(topLevelFolder) {
  const result = {
    permalink: ''
  }

  if (!topLevelFolder) {
    return result
  }

  const catalogPath = topLevelFolder + '/目录.md'

  try {
    const catalogFile = app.vault.getAbstractFileByPath(catalogPath)
    if (!catalogFile) {
      console.log('[openForm] 目录.md not found at:', catalogPath)
      return result
    }

    const content = await app.vault.read(catalogFile)
    const frontmatter = parseFrontmatter(content)

    if (frontmatter.permalink) {
      // 确保 permalink 以 / 开头且不以 / 结尾
      let pl = String(frontmatter.permalink).trim()
      if (!pl.startsWith('/')) {
        pl = '/' + pl
      }
      if (pl.endsWith('/') && pl.length > 1) {
        pl = pl.slice(0, -1)
      }
      result.permalink = pl
    }

    console.log('[openForm] 目录.md config:', result)
  } catch (e) {
    console.error('[openForm] Error reading 目录.md:', e)
  }

  return result
}

/**
 * 读取当前文件夹下的 Info.md，提取 categories 和 tags
 */
async function readInfoMd(currentFolder) {
  const result = {
    categories: '',
    tags: ''
  }

  if (!currentFolder) {
    return result
  }

  const infoPath = currentFolder + '/99.Info'

  try {
    const infoFile = app.vault.getAbstractFileByPath(infoPath)
    if (!infoFile) {
      console.log('[openForm] 99.Info not found at:', infoPath)
      return result
    }

    const content = await app.vault.read(infoFile)
    const frontmatter = parseFrontmatter(content)

    if (frontmatter.categories) {
      result.categories = formatArrayToString(frontmatter.categories)
    }

    if (frontmatter.tags) {
      result.tags = formatArrayToString(frontmatter.tags)
    }

    console.log('[openForm] 99.Info config:', result)
  } catch (e) {
    console.error('[openForm] Error reading 99.Info:', e)
  }

  return result
}

/**
 * 解析 YAML frontmatter
 */
function parseFrontmatter(content) {
  const result = {}

  if (!content || typeof content !== 'string') {
    return result
  }

  // 匹配 --- 之间的内容
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) {
    return result
  }

  const yamlContent = match[1]
  const lines = yamlContent.split('\n')

  let currentKey = ''
  let currentArray = []
  let inArray = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // 检查是否是数组项（以 - 开头）
    const arrayItemMatch = line.match(/^\s+-\s+(.*)/)
    if (arrayItemMatch && inArray) {
      currentArray.push(arrayItemMatch[1].trim())
      continue
    }

    // 检查是否是新的键值对
    const keyValueMatch = line.match(/^(\w+):\s*(.*)/)
    if (keyValueMatch) {
      // 保存之前的数组
      if (inArray && currentKey) {
        result[currentKey] = currentArray
      }

      currentKey = keyValueMatch[1]
      const value = keyValueMatch[2].trim()

      if (value === '' || value === 'null') {
        // 可能是数组开始
        inArray = true
        currentArray = []
      } else {
        // 普通键值对
        inArray = false
        result[currentKey] = value
      }
    }
  }

  // 保存最后一个数组
  if (inArray && currentKey) {
    result[currentKey] = currentArray
  }

  return result
}

/**
 * 将数组或字符串格式化为逗号分隔的字符串
 */
function formatArrayToString(value) {
  if (Array.isArray(value)) {
    return value.filter((v) => v && v !== 'null').join(', ')
  }
  if (typeof value === 'string') {
    return value
  }
  return ''
}

/**
 * 生成时间戳（用于默认后缀）
 */
function generateTimestamp() {
  const now = new Date()
  const offset = 8 * 60 * 60 * 1000 // UTC+8
  const localTime = new Date(now.getTime() + offset)
  return localTime.toISOString().slice(0, 19).replace(/[-:T]/g, '')
}

/**
 * 获取所有文件夹
 */
function getAllFolders() {
  var folders = new Set()
  folders.add('')

  var files = app.vault.getAllLoadedFiles()
  for (var i = 0; i < files.length; i++) {
    var file = files[i]
    if (file.children !== undefined) {
      folders.add(file.path)
    }
  }

  var arr = Array.from(folders)
  arr.sort(function (a, b) {
    if (a === '') return -1
    if (b === '') return 1
    return a.localeCompare(b)
  })

  return arr
}

/**
 * 解析路径获取分类和标签（回退逻辑）
 */
function parsePathInfo(path) {
  if (!path || typeof path !== 'string') {
    return { category: '未分类', tag: '未分类' }
  }

  var parts = path.split('/').filter(function (p) {
    return p && !p.endsWith('.md')
  })

  var cleanParts = parts.map(function (p) {
    return p.replace(/^\d+\./, '')
  })

  var category = cleanParts[0] || '未分类'
  var tag = cleanParts[cleanParts.length - 1] || category

  var skipNames = ['basic', 'pkg', 'docs', 'guide', '_posts', 'posts', 'articles']
  if (skipNames.indexOf(tag.toLowerCase()) !== -1) {
    tag = cleanParts[cleanParts.length - 2] || category
  }

  return { category: category, tag: tag }
}

module.exports = openForm
