import URL from 'url-parse'
import { AllHtmlEntities, XmlEntities } from 'html-entities'
const allHtmlEntities = new AllHtmlEntities()
const xmlEntities = new XmlEntities()

export function isURLSafe (dangerousURL) {
  const url = URL(dangerousURL, {})
  if (url.protocol === 'http:') return true
  if (url.protocol === 'https:') return true
  return false
}

export function stripHTMLTags (dangerousHTML) {
  return xmlEntities.decode(allHtmlEntities.decode(dangerousHTML))
}
