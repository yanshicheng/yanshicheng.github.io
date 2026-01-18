import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { teekConfig } from './teekConfig'
import { createRewrites } from 'vitepress-theme-teek/config'
const description = [
  '欢迎来到 kube-nova 使用文档',
  'KubeNova 是一个企业级 Kubernetes 多集群管理平台',
  '专为需要统一管理多个 Kubernetes 集群的企业和团队设计'
].toString()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: '../docs',
  rewrites: createRewrites({
    srcDir: './kube-nova-docs'
  }),
  base: '/',
  extends: teekConfig,
  title: 'Kube Nova',
  description: description,
  cleanUrls: true,
  lastUpdated: true,
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/kube-nova.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/kube-nova.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh-CN' }],
    ['meta', { property: 'og:title', content: 'Kube Nova Wiki' }],
    ['meta', { property: 'og:site_name', content: 'Kube Nova' }],
    ['meta', { property: 'og:image', content: '' }],
    ['meta', { property: 'og:url', content: '' }],
    ['meta', { property: 'og:description', description }],
    ['meta', { name: 'description', description }],
    ['meta', { name: 'author', content: 'YanShicheng' }],
    // 禁止浏览器缩放
    // [
    //   "meta",
    //   {
    //     name: "viewport",
    //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
    //   },
    // ],
    ['meta', { name: 'keywords', description }]
  ],
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    },
    // 更改容器默认值标题
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },
  sitemap: {
    hostname: 'https://www.ikubeops.com',
    transformItems: (items) => {
      const permalinkItemBak: typeof items = []
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig.permalinks
      items.forEach((item) => {
        const permalink = permalinks?.map[item.url]
        if (permalink) permalinkItemBak.push({ url: permalink, lastmod: item.lastmod })
      })
      return [...items, ...permalinkItemBak]
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/kube-nova.svg',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新时间',
    outline: {
      level: [2, 4],
      label: '本页导航'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '指南',
        link: '/nova/intro',
        activeMatch: '/01.指南/'
      },
    //   { text: '开发', link: '/develop/intro', activeMatch: '/15.主题开发/' },
      //   {
      //     text: '功能页',
      //     items: [
      //       { text: '归档页', link: '/archives' },
      //       { text: '清单页', link: '/articleOverview' },
      //       { text: '登录页', link: '/login' },
      //       {
      //         text: '风险链接提示页',
      //         link: '/risk-link?target=https://vp.teek.top'
      //       },
      //       { text: '分类页', link: '/categories' },
      //       { text: '标签页', link: '/tags' }
      //     ]
      //   },
      { text: '✨ 交流', link: '/personal/' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/yanshicheng/kube-nova/'
      },
      {
        icon: 'gitee',
        link: 'https://gitee.com/ikubeops/kube-nova/'
      },
      {
        icon: 'bilibili',
        link: 'https://space.bilibili.com/3546970842990678?spm_id_from=333.788.upinfo.head.click'
      }
    ],
    search: {
      provider: 'local'
    },
    editLink: {
      text: '在 GitHub 上编辑此页',
      pattern: 'https://github.com/yanshicheng/kube-nova-docs/edit/master/kube-nova-docs/:path'
    }
  },
  vite: {
    server: {
      allowedHosts: ['local.ikubeops.com']
    },
    plugins: [llmstxt() as any]
  }
  // transformHtml: (code, id, context) => {
  //   if (context.page !== "404.md") return code;
  //   return code.replace("404 | ", "");
  // },
})
