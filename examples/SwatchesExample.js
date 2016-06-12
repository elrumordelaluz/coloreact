import React, { Component } from 'react';
import ColorPicker from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/dist/styles';

class SwatchesExample extends Component {
  constructor (props) {
    super(props);
    this.state = {
      swatches: ['rgba(250,67,10,0.7)', 'rgba(16,16,151,1)'],
      selected: 0,
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
    swatches[this.state.selected] = color.rgbaString;
    this.setState({
      swatches
    })
  }

  render () {
    return (
      <div className="examples__swatches">
        <h3>Swatches Example</h3>
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
        <code>{this.state.swatches[this.state.selected]}</code>
        <ColorPicker
          style={{ position: 'relative', height: '300px', width: '300px', }}
          color={this.state.swatches[this.state.selected]}
          opacity={true}
          onChange={this.handleChange} />
        <SyntaxHighlighter language='jsx' style={atelierSavannaDark}>
        {`import ColorPicker from 'coloreact';

<ColorPicker
  color={this.state.swatches[this.state.selected]}
  opacity={true}
  onChange={this.handleChange} />`}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default SwatchesExample;
