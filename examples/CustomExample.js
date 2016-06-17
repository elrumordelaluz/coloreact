import React, { Component } from 'react';
import { Slider, Map } from '../src';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/styles';
import tinycolor from 'tinycolor2';

class CustomExample extends Component {
  constructor (props) {
    super(props);
    this.state = {
      h: 155,
      s: 50,
      v: 50,
      mapActive: false,
      sliderActive: false,
    }
    this._sv = this._sv.bind(this);
    this._h = this._h.bind(this);
    this.resetActive = this.resetActive.bind(this);
  }

  _sv (s, v)  {
    this.setState({ s, v, mapActive: true });
  }

  _h (h) {
    this.setState({ h, sliderActive: true });
  }

  resetActive () {
    this.setState({
      mapActive: false,
      sliderActive: false
    })
  }

  getHue () {
    const color = tinycolor(`hsv(${this.state.h}, 100, 100)`);
    // return u.toRgbString([this.state.h, 100, 100]);
    return color.toRgbString();
  }

  render () {
    const color = tinycolor(`hsv(${this.state.h}, ${this.state.s}, ${this.state.v})`);
    const rgb = color.toRgbString();
    return (
      <div className="example">
        <h3>Custom ColorPicker</h3>
        <div style={{
            position: 'relative',
            height: '300px',
            border: `1em solid ${rgb}`,
            marginBottom: '3em'
          }}>
          <Map
            x={this.state.s}
            y={this.state.v}
            max={100}
            onChange={this._sv}
            backgroundColor={this.getHue()}
            className="MyCustomMap"
            onComplete={this.resetActive}
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}

            pointerStyle={{
              width: 30,
              height: 30,
              marginLeft: -15,
              marginBottom: -15,
              boxShadow: this.state.mapActive ? '.3em .3em 2em rgba(0,0,0,.3), inset 0 0 .1em rgba(255,255,255,.1)' : 'inset 0 0 .5em rgba(0,0,0,.3), 0 0 .3em rgba(255,255,255,.1)',
              border: 0,
              transition: 'transform 250ms, box-shadow 250ms',
              transform: this.state.mapActive ? 'scale(1)' : 'scale(.95)',
            }}
            />
          <Slider
            max={360}
            value={this.state.h}
            onChange={this._h}
            onComplete={this.resetActive}
            style={{
              bottom: '1em',
              left: '1em',
              right: '1em',
            }}
            trackStyle={{
              backgroundColor: 'transparent',
            }}
            pointerStyle={{
              backgroundColor: 'transparent',
              borderRadius: '100%',
              boxShadow: `inset 0 0 .5em ${this.getHue()},
                          0 0 .75em ${this.getHue()}`,
              animationName: 'moveLeftRight',
              animationDuration: '1s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate',
              animationPlayState: this.state.sliderActive ? 'paused' : 'running',
            }}
          />
        </div>
        <SyntaxHighlighter language='jsx' style={rainbow}>
        {`import { Map, Slider } from 'coloreact';

<Map
  x={this.state.s}
  y={this.state.v}
  max={100}
  onChange={this._sv}
  backgroundColor={this.getHue()}
  style={{ ... }}
  pointerStyle={{ ... }}
  />

<Slider
  max={360}
  value={this.state.h}
  onChange={this._h}
  style={{ ... }}
  trackStyle={{ ... }}
  pointerStyle={{ ... }}
/>`}
        </SyntaxHighlighter>

        <a className="example__codeLink" href="https://github.com/elrumordelaluz/coloreact/blob/master/examples/CustomExample.js">Example Full code</a>
      </div>
    );
  }
}

export default CustomExample;
