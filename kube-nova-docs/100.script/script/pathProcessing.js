// pathProcessing.js
// 生成 VitePress 永久链接
// 放置位置: 你的 Templater 脚本文件夹（如 100.template/script/）

function getRelativePath(fullPath) {
  // 增强空值检查
  if (!fullPath || typeof fullPath !== 'string') {
    console.warn('[pathProcessing] Invalid path:', fullPath)
    return '/posts/' + Date.now()
  }

  console.log('[pathProcessing] Full Path:', fullPath)

  try {
    // 移除文件扩展名
    let cleanPath = fullPath.replace(/\.md$/, '')

    // 移除路径中的数字前缀 (如 "01.python" -> "python")
    cleanPath = cleanPath
      .split('/')
      .map((part) => {
        return part.replace(/^\d+\./, '')
      })
      .join('/')

    // 生成时间戳作为文件名
    const now = new Date()
    // 调整到 UTC+8
    const offset = 8 * 60 * 60 * 1000
    const localTime = new Date(now.getTime() + offset)
    const timestamp = localTime.toISOString().slice(0, 19).replace(/[-:T]/g, '')

    // 分割路径，替换文件名为时间戳
    const pathParts = cleanPath.split('/').filter((p) => p)

    if (pathParts.length > 0) {
      pathParts[pathParts.length - 1] = timestamp
    } else {
      pathParts.push(timestamp)
    }

    const result = '/' + pathParts.join('/')
    console.log('[pathProcessing] Generated permalink:', result)
    return result
  } catch (e) {
    console.error('[pathProcessing] Error:', e)
    return '/posts/' + Date.now()
  }
}

module.exports = getRelativePath
