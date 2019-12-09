export default function linkResolver(doc) {
  if (doc.type === 'page') {
    return '/page/' + doc.uid
  }

  return '/'
}
