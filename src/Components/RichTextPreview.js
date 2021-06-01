import React, {useCallback, useMemo} from 'react';
import {Editable, withReact, Slate, useSelected, useFocused} from 'slate-react';
import {createEditor} from 'slate';

const Element = ({attributes, children, element}) => {
  const selected = useSelected();
  const focused = useFocused();

  const style = extractStyle(element);

  switch (element.type) {
    case 'blockquote':
      return (
        <blockquote {...attributes} style={style}>
          {children}
        </blockquote>
      );
    case 'h1':
      return (
        <h1 {...attributes} style={style}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 {...attributes} style={style}>
          {children}
        </h2>
      );
    case 'li':
      return (
        <li {...attributes} style={style}>
          {children}
        </li>
      );
    case 'ul':
      return (
        <ul {...attributes} style={style}>
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol {...attributes} style={style}>
          {children}
        </ol>
      );
    case 'a':
      return (
        <a {...attributes} href={element.href}>
          {children}
        </a>
      );
    case 'img':
      return (
        <div {...attributes}>
          <img
            src={element.src}
            alt="this is a text description"
            width="100%"
            height="auto"
            style={{
              display: 'block',
              boxShadow: `${
                selected && focused ? '0 0 0 3px #B4D5FF' : 'none'
              }`,
            }}
          />
          <div>{children}</div>
        </div>
      );
    case 'youtube':
      return (
        <div
          {...attributes}
          style={{
            boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
            //for responsive size
            position: 'relative',
            paddingTop: `${(9 / 16) * 100}%`,
          }}>
          <iframe
            title={`YouTube Player`}
            src={element.src}
            style={{
              //for responsive size
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
            }}
          />
          {children}
        </div>
      );
    default:
      return (
        <p {...attributes} style={style}>
          {children}
        </p>
      );
  }
};

const Leaf = ({attributes, children, leaf}) => {
  const style = extractStyle(leaf);

  return (
    <span {...attributes} style={style}>
      {children}
    </span>
  );
};

function extractStyle(obj) {
  const style = {
    ...(obj.textDecoration && {textDecoration: obj.textDecoration}),
    ...(obj.fontStyle && {fontStyle: obj.fontStyle}),
    ...(obj.fontWeight && {fontWeight: obj.fontWeight}),
    ...(obj.backgroundColor && {backgroundColor: obj.backgroundColor}),
    ...(obj.color && {color: obj.color}),
    ...(obj.textAlign && {textAlign: obj.textAlign}),
  };

  if (obj.type === 'p') {
    style.margin = 0;
  }

  if (obj.type === 'blockquote') {
    style.borderLeft = 'solid 3px lightgray';
    style.paddingLeft = 10;
  }

  if (obj.code) {
    style.backgroundColor = 'lightgray';
    style.padding = 2;
    style.fontSize = 14;
    style.borderRadius = 3;
  }

  return style;
}

export default function Preview(props) {
  const {content} = props;
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={Array.isArray(content) ? content : []}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
}

export {Element, Leaf};
