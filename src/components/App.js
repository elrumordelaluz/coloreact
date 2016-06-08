import React, { Component } from 'react';
import ColorPicker from './ColorPicker';

class App extends Component {
  render () {
    return (
      <ColorPicker
        opacitySlider={true}
        color="rgba(25,6,1,1.5)"
        onChange={color => console.log(color) } />
    );
  }
}

export default App;
