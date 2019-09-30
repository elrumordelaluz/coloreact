import React from 'react'
import ColorPicker from '../src'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const SingleExample = () => {
  return (
    <div className="example">
      <h3>Single ColorPicker</h3>
      <ColorPicker
        style={{
          position: 'relative',
          height: '300px',
          width: '100%',
          paddingLeft: '1.3em',
        }}
        color="#408fa3"
        onChange={color => console.log('single-example color:', color.hex)}
      />
      <SyntaxHighlighter language="jsx" style={atomDark}>
        {`import ColorPicker from 'coloreact';
<ColorPicker color="#408fa3" onChange={color => console.log(color.hex)} />`}
      </SyntaxHighlighter>
      <a
        className="example__codeLink"
        href="https://github.com/elrumordelaluz/coloreact/blob/master/examples/SingleExample.js"
      >
        Source
      </a>{' '}
      |{' '}
      <a
        href="https://codesandbox.io/s/w6l8rxwpk5"
        className="example__codeLink"
      >
        Edit
      </a>
    </div>
  )
}

export default SingleExample
