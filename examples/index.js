import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Styles from './styles.css';
import ColorPicker, { Slider, Map } from '../src';

import SingleExample from './SingleExample';
import SwatchesExample from './SwatchesExample';
import CustomExample from './CustomExample';

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
      <div className="examples">
        <h1>coloreact</h1>
        <SingleExample />
        <SwatchesExample />
        <CustomExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
