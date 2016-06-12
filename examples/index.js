import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
import ColorPicker, { Slider, Map } from '../src';

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
      <div className="App">
        <button onClick={() => this.handleChange('#d5d5d5')}>a</button>
        <button onClick={() => this.handleChange('#0f34a1')}>b</button>
        <button onClick={() => this.handleChange('#7a3')}>c</button>
        <ColorPicker
          className="MyColorPicker"
          opacity={true}
          color={this.state.currentColor}
          onChange={color => color }
          onComplete={color => console.log(color) } />

        <div style={{ position: 'relative', height: '600px' }}>
          <Map
            x={this.state.x}
            y={this.state.y}
            max={100}
            onChange={this.changeMap}
            backgroundColor={'yellow'}

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
            background="red"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
