// https://blog.csdn.net/pjsdsg/article/details/104918098/
module.exports = {
  title: 'vuo',                                   // 浏览器标签页标题
  showSettings: true,                             // 右侧齿轮设置项
  tagsView: true,                                 // 打开某个页面是否有页面标签
  fixedHeader: false,                             // 内容页面向下滑动时头部是否固定
  sidebarLogo: false,                             // 左侧菜单栏最上方是否显示主图标
  supportPinyinSearch: true,                      // 是否支持headerSearch中的拼音搜索
  errorLog: ['production', 'development']         // 需要显示错误日志组件，默认只在生产显示。可以传递数组多个环境['production', 'development']
}
