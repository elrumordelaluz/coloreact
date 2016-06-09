import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ColorPicker } from '../src';

class App extends Component {
  render () {
    return (
      <ColorPicker
        opacity={true}
        color="rgba(25,6,1,1.5)"
        onChange={color => color }
        onComplete={color => console.log(color) } />
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
