import { penName, footerTitle } from '../common/info'

interface Footer {
  createYear: number // 博客创建年份
  copyrightInfo: string // 博客版权信息，支持 a 标签
}

export default <Footer>{
  // 页脚信息
  createYear: 2024,
  copyrightInfo: penName + ' | ' + footerTitle + '<br> <a href="http://beian.miit.gov.cn/" target="_blank">京ICP备16013810号</a>'
}
