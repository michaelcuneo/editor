import escapeHtml from 'escape-html';
import { Text } from 'slate';
import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS = {
  P: () => ({ type: 'paragraph' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  BLOCKQUOTE: () => ({ type: 'quote' }),
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  UL: () => ({ type: 'bulleted-list' }),
  LINK: el => ({ type: 'link', url: el.getAttribute('href') }),
  IMG: el => ({ type: 'image', url: el.getAttribute('src') }),
};

const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

const getNode = ({ element, children }) => {
  switch (element.type) {
    case 'block-quote':
      return `<blockquote>${children}</blockquote>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'link':
      return `<a href="${escapeHtml(children.url)}">${children}</a>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'numbered-list':
      return `<ol>${children.map(child => `<li>${child}</li>`)}</ol>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'pre':
      return `<pre>${children}</pre>`;
    default:
      return children;
  }
};

const getLeaf = ({ leaf, children }) => {
  switch (leaf) {
    case 'bold':
      return `<strong>${children}</strong>`;
    case 'italic':
      return `<i>${children}</i>`;
    case 'underline':
      return `<u>${children}</u>`;
    case 'code':
      return `<code>${children}</code>`;
    default:
      return children;
  }
};

// Define a serializing function that takes a value and returns a string.
export const serialize = nodes => {
  if (Text.isText(nodes)) {
    return escapeHtml(nodes.text);
  }

  return nodes
    .map(node => {
      if (Text.isText(node)) {
        return getLeaf({ leaf: node, children: node.text });
      }
      return getNode({ element: node, children: serialize(node.children) });
    })
    .join('');
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

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx('text', attrs, child));
  }

  return children;
};
