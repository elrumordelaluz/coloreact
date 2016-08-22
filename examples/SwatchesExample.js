import React, { Component } from 'react';
import ColorPicker from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/styles';

class SwatchesExample extends Component {
  constructor (props) {
    super(props);
    this.state = {
      swatches: [
        'rgb(157, 41, 177)', 
        '#673AB7', 
        'rgba(182, 73, 98, 1)', 
        '#00BCD4', 
        'LightSeaGreen', 
        'rgb(76, 175, 80)', 
        'rgba(8, 136, 124, .7)', 
        '#CDDC39',
      ],
      selected: 5,
    }
    this.selectSwatch = this.selectSwatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  selectSwatch (selected) {
    this.setState({
      selected
    })
  }

  handleChange (color) {
    const swatches = [...this.state.swatches];
    swatches[this.state.selected] = color.rgbString;
    this.setState({
      swatches
    })
  }

  render () {
    const actualColor = this.state.swatches[this.state.selected];
    return (
      <div className="example">
        <h3>ColorPicker with Swatches</h3>
        <ul className="swatches">
          {
            this.state.swatches.map((col, i) => (
              <li
                style={{ backgroundColor: col }}
                key={i}
                className={this.state.selected === i && 'selected'}
                onClick={() => this.selectSwatch(i)} />
            ))
          }
        </ul>
        <code className="swatch-value" style={{ color:actualColor }}>
          { actualColor }
        </code>
        <ColorPicker
          style={{ position: 'relative', height: '300px', width: '100%', paddingLeft: '1.3em' }}
          color={this.state.swatches[this.state.selected]}
          onChange={this.handleChange} opacity />
        <SyntaxHighlighter language='jsx' style={rainbow}>
        {`import ColorPicker from 'coloreact';
<ColorPicker
  color={this.state.swatches[this.state.selected]}
  opacity={true}
  onChange={this.handleChange} />`}
        </SyntaxHighlighter>
        <a className="example__codeLink" href="https://github.com/elrumordelaluz/coloreact/blob/master/examples/SwatchesExample.js">Example Full code</a>
      </div>
    );
  }
}

export default SwatchesExample;
