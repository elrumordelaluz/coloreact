import React, { Component } from 'react';
import { Slider, Map } from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierSavannaDark } from 'react-syntax-highlighter/dist/styles';

class CustomExample extends Component {
  constructor (props) {
    super(props);
    this.state = {
      swatches: ['#f00', '#000'],
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
    this.state.swatches[this.state.selected] = color.rgbaString;
    this.setState({
      swatches: this.state.swatches
    })
  }

  render () {
    return (
      <div className="examples__custom">
        <h3>Custom Example</h3>
        <div style={{ position: 'relative', height: '600px' }}>
          <Map
            x={50}
            y={50}
            max={100}
            onChange={(a) => console.log(a)}
            backgroundColor={'yellow'}
            className="MyCustomMap"

            style={{
              top: '5em',
              right: '2.5em',
              bottom: '5em',
              left: '2.5em',
            }}

            pointerStyle={{
              width: 100,
              height: 100,
              marginLeft: -50,
              marginBottom: -50,
              backgroundColor: 'rgba(255,255,255,.1)',
              borderColor: this.state.x > 50 ? 'black' : 'yellow',
            }}
            />
          <Slider
            max={1}
            value={this.state.val}
            onChange={this.changeSlider}
            style={{
              bottom: '2.5em',
              left: '2.5em',
              right: '2.5em'
            }}
            pointerStyle={{
              border: '1px solid'
            }}
          />
        </div>
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

export default CustomExample;
