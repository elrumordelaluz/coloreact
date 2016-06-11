import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ColorPicker, Slider, Map } from '../src';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentColor: '#f00',
      val: .5,
      x: 50,
      y: 50,
    }
    this.changeSlider = this.changeSlider.bind(this);
    this.changeMap = this.changeMap.bind(this);
  }

  handleChange (color) {
    this.setState({
      currentColor: color
    })
  }

  changeSlider (val) {
    this.setState({
      val
    })
  }

  changeMap (x, y) {
    this.setState({
      x,
      y,
    })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.handleChange('#d5d5d5')}>a</button>
        <button onClick={() => this.handleChange('#0f34a1')}>b</button>
        <button onClick={() => this.handleChange('#7a3')}>c</button>
        <div style={{
            position: 'relative',
            width: '100%',
            height: '400px',
          }}>

          <ColorPicker
            opacity={true}
            color={this.state.currentColor}
            onChange={color => color }
            onComplete={color => console.log(color) } />
        </div>
        <div style={{ position: 'relative', height: '600px' }}>
          <Map
            x={this.state.x}
            y={this.state.y}
            max={100}
            onChange={this.changeMap}
            backgroundColor={'green'}
            />
          <Slider
            max={1}
            value={this.state.val}
            onChange={this.changeSlider}
            vertical={true}
            background="red"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
