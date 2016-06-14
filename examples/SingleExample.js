import React from 'react';
import ColorPicker from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/styles';

const SingleExample = () => {
  return (
    <div className="example">
      <h3>Simple Example</h3>

      <ColorPicker
        style={{ position: 'relative', height: '300px', width: '100%', paddingLeft: '1.3em' }}
        color="#408fa3"
        onChange={color => console.log('single-example color:', color.hex) } />

      <SyntaxHighlighter language='jsx' style={rainbow}>
        {`import ColorPicker from 'coloreact';
<ColorPicker color="#408fa3" onChange={color => console.log(color.hex)} />`}
      </SyntaxHighlighter>

    </div>
  );
}

export default SingleExample;
