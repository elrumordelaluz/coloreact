import React from 'react';
import ColorPicker from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/dist/styles';

const SingleExample = () => {
  return (
    <div className="examples__single">
      <h3>Single Example</h3>
      <ColorPicker
        style={{ position: 'relative', height: '300px', width: '300px', }}
        color="#f00"
        onChange={color => console.log(color) } />
      <SyntaxHighlighter language='jsx' style={atelierSavannaDark}>
        {`import ColorPicker from 'coloreact';
<ColorPicker color="#f00" onChange={(color) => color } />`}
      </SyntaxHighlighter>
    </div>
  );
}

export default SingleExample;
