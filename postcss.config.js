module.exports = {
  plugins: [require('autoprefixer')]             // 需要在package.json 配置 browserslist
  // plugins: [
  //     require('autoprefixer')({
  //         "browsers": [
  //             "defaults",
  //             "not ie < 11",
  //             "last 2 versions",
  //             "> 1%",
  //             "iOS 7",
  //             "last 3 iOS versions"
  //         ]
  //     })
  // ]
}
