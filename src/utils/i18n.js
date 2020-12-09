// router.meta.title, 用于面包屑侧边栏标签视图中
export function generateTitle(title) {
  const hasKey = this.$te('route.' + title)

  if (hasKey) {
    // $t这个函数来自vue-i18n, 注入 @/lang/index.js
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
