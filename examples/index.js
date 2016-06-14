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
  }

  render () {
    return (
      <div className="examples">
        <header className="examples-header">
          <h1 className="main-title">
            <a href="https://github.com/elrumordelaluz/coloreact">coloreact</a>
          </h1>
          <p>A tiny Color Picker for React</p>
        </header>
        <SingleExample />
        <SwatchesExample />
        <CustomExample />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
