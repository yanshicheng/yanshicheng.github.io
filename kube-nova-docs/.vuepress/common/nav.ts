// nav
// 微服务统一放在框架里
// import cloudNav from '../nav/cloudNav'
import cloudNative from '../nav/cloudNative'
import pythonNav from '../nav/pythonNav'
import golangNav from '../nav/golangNav'
import microserviceNav from '../nav/microserviceNav'
import projectNav from '../nav/projectNav'
export default [
  {
    text: '首页',
    link: '/'
  },
  //   {
  //     text: '导航站',
  //     link: '/navigation/'
  //   },
  pythonNav, // linux导航
  golangNav,
  cloudNative,
  microserviceNav,
  projectNav, // 数据库导航
  {
    text: '留言区',
    link: '/message-area/'
  }
]
