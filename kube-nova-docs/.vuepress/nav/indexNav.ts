// 索引导航
export default {
  text: '索引',
  link: '/archives/',
  items: [
    {
      text: '本站',
      items: [
        { text: '分类', link: '/categories/' },
        { text: '标签', link: '/tags/' },
        { text: '归档', link: '/archives/' }
      ]
    },
    {
      text: '我的',
      items: [
        { text: '运维平台[Py]', link: 'http://www.pgoops.com/' },
        { text: '运维平台[Go]', link: 'https://www.yanshicheng.com/' },
        { text: '运维知识库[Go]', link: 'https://docks.yanshicheng.com/' },
        { text: '开发知识库[Go]', link: 'https://coder.yanshicheng.com/' }
      ]
    }
  ]
}
