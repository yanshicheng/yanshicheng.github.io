// pathTag.js
// 智能解析路径获取分类/标签
// 放置位置: 你的 Templater 脚本文件夹（如 100.template/script/）

function getPathTag(fullPath) {
  // 增强空值检查
  if (!fullPath || typeof fullPath !== 'string') {
    console.warn('[pathTag] Invalid path:', fullPath)
    return '未分类'
  }

  console.log('[pathTag] Full Path:', fullPath)

  try {
    // 分割路径并过滤空值和文件名
    const pathParts = fullPath.split('/').filter((p) => p && !p.endsWith('.md'))

    if (pathParts.length === 0) {
      return '未分类'
    }

    // 需要跳过的通用目录名
    const skipNames = ['basic', 'pkg', 'docs', 'guide', 'posts', '_posts', 'articles', 'blog', 'content', 'src', 'source', 'pages']

    // 获取文件名（可能用于 pkg 场景）
    const fileNameMatch = fullPath.match(/([^/]+)\.md$/)
    const fileName = fileNameMatch ? fileNameMatch[1] : ''

    // 检查路径是否包含 "pkg"（包相关文档）
    const lowerPath = fullPath.toLowerCase()
    if (lowerPath.includes('/pkg/') || lowerPath.includes('/pkg')) {
      // 使用文件名作为标签（去掉数字前缀）
      const cleanFileName = fileName.replace(/^\d+\./, '')
      if (cleanFileName) {
        console.log('[pathTag] PKG mode, using filename:', cleanFileName)
        return cleanFileName
      }
    }

    // 从后往前找第一个有意义的目录名
    for (let i = pathParts.length - 1; i >= 0; i--) {
      let dirName = pathParts[i]

      // 清理数字前缀
      dirName = dirName.replace(/^\d+\./, '')

      // 跳过通用目录名
      if (!skipNames.includes(dirName.toLowerCase()) && dirName.length > 0) {
        console.log('[pathTag] Found tag:', dirName)
        return dirName
      }
    }

    // 如果都被跳过了，返回第一个清理后的目录名
    const firstClean = pathParts[0]?.replace(/^\d+\./, '') || '未分类'
    console.log('[pathTag] Fallback tag:', firstClean)
    return firstClean
  } catch (e) {
    console.error('[pathTag] Error:', e)
    return '未分类'
  }
}

module.exports = getPathTag
