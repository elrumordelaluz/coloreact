import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ColorPicker } from '../src';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentColor: '#f00'
    }
  }

  handleChange (color) {
    this.setState({
      currentColor: color
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
