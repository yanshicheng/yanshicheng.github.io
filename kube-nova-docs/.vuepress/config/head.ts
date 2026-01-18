import { HeadTags } from 'vuepress/config'
import baidutj from '../common/baidutj.js'
// head
export default <HeadTags>[
  // 将百度站点验证的 meta 标签移到更靠前的位置
  ['meta', { name: 'baidu-site-verification', content: 'codeva-i1I7g2e68F' }],

  ['link', { rel: 'shortcut icon', href: '/img/favicon.ico' }], //favicons，资源放在public文件夹
  ['link', { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3114978_qe0b39no76.css' }], // 阿里在线矢量库
  ['link', { rel: 'stylesheet', href: '/styles/index.css' }],
  ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }], // 解决 Chrome 网站统计不准确问题

  ['noscript', {}, '<meta http-equiv="refresh" content="0; url=https://www.yanshicheng.com/noscript/"><style>.theme-vdoing-content { display:none }'], // 私密文章模块需要
  [
    'meta',
    {
      name: '闫世成 云原生编程之路',
      content: '闫世成 云原生编程之路。'
    }
  ],
  ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色

  // Twikoo 评论系统
  ['script', { src: 'https://cdn.staticfile.org/twikoo/1.6.7/twikoo.all.min.js' }],

  // 百度统计 js
  ['script', {}, baidutj]

  // 其他注释掉的标签...
]
