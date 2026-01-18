import { defineTeekConfig } from 'vitepress-theme-teek/config'

export const teekConfig = defineTeekConfig({
  teekHome: false, // 是否开启博客首页
  vpHome: true, // 是否隐藏 VP 首页
  // 文章页底部的最近更新栏配置
  articleUpdate: {
    enabled: false, // 是否启用文章最近更新栏
    limit: 3 // 文章最近更新栏显示数量
  },
  themeEnhance: {
    layoutSwitch: {
      defaultMode: 'bothWidthAdjustable'
    }
  },
  sidebarTrigger: true, // 是否开启侧边栏折叠功能
  author: { name: 'Yanshicheng', link: 'https://github.com/yanshicheng' },
  footerInfo: {
    theme: {
      name: `Kube Nova`
    },
    copyright: {
      createYear: 2025,
      suffix: 'KubeNova'
    }
  },
  codeBlock: {
    copiedDone: (TkMessage) => TkMessage.success('复制成功！')
  },
  articleShare: { enabled: true },
  vitePlugins: {
    sidebarOption: {
      initItems: false,
      collapsed: true, //打开侧边栏自动收缩功能
      // ignoreList: ["nav"], //忽略的文件夹和文件
      ignoreWarn: true, // 忽略警告
      ignoreList: [/^_.*$/],
      resolveRule: 'rewrites',
      checkRewritesPrefix: true
    }
  }
})
