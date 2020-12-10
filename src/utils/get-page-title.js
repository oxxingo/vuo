import settings from '@/settings'

const title = settings.title || 'vuo'

export default function getPageTitle(key) {
  if (key) {
    return `${key} - ${title}`
  }
  return title
}
