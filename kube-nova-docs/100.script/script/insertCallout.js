// insertCallout.js
// 弹出单个对话框插入 Callout

async function insertCallout() {
  const modalForm = app.plugins.plugins.modalforms?.api

  if (!modalForm) {
    new Notice('未找到 Modal Form 插件！')
    return null
  }

  try {
    const formDefinition = {
      title: '插入 Callout',
      fields: [
        {
          name: 'type',
          label: '类型',
          description: '选择 Callout 类型',
          input: {
            type: 'select',
            source: 'fixed',
            options: [
              { value: 'NOTE', label: '📝 Note - 笔记' },
              { value: 'TIP', label: '💡 Tip - 提示' },
              { value: 'WARNING', label: '⚠️ Warning - 警告' },
              { value: 'DANGER', label: '🔴 Danger - 危险' },
              { value: 'INFO', label: 'ℹ️ Info - 信息' },
              { value: 'SUCCESS', label: '✅ Success - 成功' },
              { value: 'QUESTION', label: '❓ Question - 问题' },
              { value: 'FAILURE', label: '❌ Failure - 失败' },
              { value: 'BUG', label: '🐛 Bug - 缺陷' },
              { value: 'EXAMPLE', label: '📋 Example - 示例' },
              { value: 'QUOTE', label: '💬 Quote - 引用' },
              { value: 'ABSTRACT', label: '📄 Abstract - 摘要' },
              { value: 'TODO', label: '☑️ Todo - 待办' }
            ]
          }
        },
        {
          name: 'title',
          label: '标题',
          description: '可选，留空则使用默认标题',
          input: { type: 'text' }
        },
        {
          name: 'content',
          label: '内容',
          description: '输入 Callout 内容',
          input: { type: 'textarea' }
        },
        {
          name: 'foldState',
          label: '折叠状态',
          description: '选择是否可折叠',
          input: {
            type: 'select',
            source: 'fixed',
            options: [
              { value: '', label: '不可折叠' },
              { value: '+', label: '可折叠（默认展开）' },
              { value: '-', label: '可折叠（默认折叠）' }
            ]
          }
        }
      ]
    }

    const defaultValues = {
      type: 'NOTE',
      title: '',
      content: '',
      foldState: ''
    }

    const result = await modalForm.openForm(formDefinition, { values: defaultValues })

    if (result) {
      const data = typeof result.getData === 'function' ? result.getData() : result

      const type = data.type || 'NOTE'
      const title = data.title || ''
      const content = data.content || ''
      const foldState = data.foldState || ''

      // 处理多行内容，每行都要加 > 前缀
      const contentLines = content
        .split('\n')
        .map((line) => '> ' + line)
        .join('\n')

      // 生成 Callout 文本
      const calloutText = `> [!${type}]${foldState} ${title}\n${contentLines}`

      // 插入到当前光标位置
      const editor = app.workspace.activeLeaf?.view?.editor
      if (editor) {
        const cursor = editor.getCursor()
        editor.replaceRange(calloutText + '\n', cursor)
        new Notice('Callout 已插入')
      } else {
        new Notice('未找到活动编辑器')
      }
    }

    return result
  } catch (e) {
    console.error('Insert Callout error:', e)
    new Notice('插入失败: ' + e.message)
    return null
  }
}

module.exports = insertCallout
