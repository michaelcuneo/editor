import escapeHtml from 'escape-html';
import { Text } from 'slate';
import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  P: () => ({ type: 'paragraph' }),
  BOLD: () => ({ type: 'bold' }),
  ITALIC: () => ({ type: 'italic' }),
  UNDERLINE: () => ({ type: 'underline' }),
  CODE: () => ({ type: 'code' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  UL: () => ({ type: 'bulleted-list' }),
  LINK: el => ({ type: 'link', url: el.getAttribute('href') }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
};

const getNode = node => {
  switch (node.type) {
    case 'bold':
      return `<p><strong>${node.children[0].text}</strong><p>`;
    case 'italic':
      return `<p><i>${node.children[0].text}</i></p>`;
    case 'underline':
      return `<p><u>${node.children[0].text}</u></p>`;
    case 'code':
      return `<p><code>${node.children[0].text}</code></p>`;
    case 'block-quote':
      return `<blockquote>${node.children[0].text}</blockquote>`;
    case 'paragraph':
      return `<p>${node.children[0].text}</p>`;
    case 'link':
      return `<a href="${escapeHtml(node.children[0].url)}">${
        node.children[0].text
      }</a>`;
    case 'heading-one':
      return `<h1>${node.children[0].text}</h1>`;
    case 'heading-two':
      return `<h2>${node.children[0].text}</h2>`;
    case 'numbered-list':
      return `<ol>${node.children.map(
        child => `<li>${child.children[0].text}</li>`,
      )}</ol>`;
    case 'bulleted-list':
      return `<ul>${node.children[0]}</ul>`;
    case 'list-item':
      return `<li>${node.children[0].text}</li>`;
    case 'pre':
      return `<pre>${node.children[0].text}</pre>`;
    default:
      return node.children[0].text;
  }
};

// Define a serializing function that takes a value and returns a string.
export const serialize = nodes => {
  if (Text.isText(nodes)) {
    return escapeHtml(nodes.text);
  }

  const children = nodes.map(node => getNode(node));
  return children;
};

// Define a deserializing function that takes a string and returns a value.
export const deserialize = el => {
  if (el.nodeType === 3) {
    return el.textContent;
  }

  if (el.nodeType !== 1) {
    return null;
  }

  if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    [parent] = el.childNodes;
  }

  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat();

  if (el.nodeName === 'BODY') {
    return jsx('fragment', children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  return children;
};
