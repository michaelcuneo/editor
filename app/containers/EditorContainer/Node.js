import escapeHtml from 'escape-html';
import { jsx } from 'slate-hyperscript';
import { Node, Text } from 'slate';

// Define a serializing function that takes a value and returns a string.
export const serialize = nodes => {
  const children = Array.from(nodes).map(deserialize);

  nodes.forEach(node => {
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
        return `<p>${children}</p>`
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      default:
        return children
    }
  })
}

// Define a deserializing function that takes a string and returns a value.
export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  }

  const children = Array.from(el.childNodes).map(deserialize)

  switch (el.nodeName) {
    case 'BODY':
      return jsx('fragment', {}, children)
    case 'BR':
      return '\n'
    case 'BLOCKQUOTE':
      return jsx('element', { type: 'quote' }, children)
    case 'P':
      return jsx('element', { type: 'paragraph' }, children)
    case 'A':
      return jsx(
        'element',
        { type: 'link', url: el.getAttribute('href') },
        children
      )
    case 'IMG':
      return jsx(
        'element',
        { type: 'image', src: el.getAttribute('src') },
        children
      )
    default:
      return el.textContent
  }
}
