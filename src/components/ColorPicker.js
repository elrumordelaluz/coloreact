import React, { Component, PropTypes } from 'react';
import * as u from '../utils';
import Slider from './Slider';
import Map from './Map';
import throttle from 'lodash/throttle';

import tinycolor from 'tinycolor2';

class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // color: u.toHSV(this.props.color)
      color: tinycolor(this.props.color).toHsv()
    }

    this.throttle = throttle(function (fn: any, data: any) {
      fn(data)
    }, 100);

    this.handleSaturationValueChange = this.handleSaturationValueChange.bind(this);
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleAlphaChange = this.handleAlphaChange.bind(this);
    this.showLastValue = this.showLastValue.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    // if (!u.equals(u.toHSV(nextProps.color), this.state.color)) {
    if (tinycolor.equals(nextProps.color, this.state.color)) {
      this.setState({
        // color: u.toHSV(nextProps.color)
        color: tinycolor(nextProps.color).toHsv()
      });
    }
  }

  handleHueChange (h) {
    const {s, v, a} = this.state.color;
    this.update({h, s, v, a});
  }

  handleSaturationValueChange(s, v) {
    const { h, a } = this.state.color;
    this.update({h, s, v, a});
  }

  handleAlphaChange (a) {
    const { h, s, v } = this.state.color;
    this.update({ h, s, v, a });
  }

  getAlpha () {
    return this.state.color.a === undefined ? 1 : this.state.color.a;
  }

  getBackgroundHue () {
    return u.toRgbString([this.state.color.h, 100, 100]);
  }

  getBackgroundGradient() {
    const {h, s, v} = this.state.color;
    const opaque = u.toRgbString([h, s, v, 1]);
    return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
  }

  update (color) {
    this.setState({ color });
    this.throttle(this.props.onChange, this.output());
  }

  output () {
    const { color } = this.state;
    const c = tinycolor(color);
    // const rgbArr = u.toRGBa(color);
    // const hex = u.toHEX(rgbArr);
    // const rgbaString = u.toRgbString(color);
    // const rgba = {
    //   r: rgbArr[0],
    //   g: rgbArr[1],
    //   b: rgbArr[2],
    //   a: rgbArr[3]
    // }
    // const hsv = {
    //   h: color[0],
    //   s: color[1],
    //   v: color[2]
    // };
    //
    // return { rgba, rgbaString, hex, hsv, };
    return c;
  }

  showLastValue () {
    this.props.onComplete && this.props.onComplete(this.output());
  }

  render () {
    const { h, s, v, a } = this.state.color;
    console.log(s, v)
    return (
      <div
        className={this.props.className || 'ColorPicker'}
        style={this.props.style}>

        <Slider
          className="HueSlider"
          vertical={true}
          value={h}
          type="hue"
          max={360}
          onChange={this.handleHueChange}
          onComplete={this.showLastValue}
          style={{
            right: '1.3em',
            bottom: this.props.opacity ? '2.5em' : '1.3em',
          }}
          trackStyle={{
            borderRadius: '1em',
            background: `linear-gradient(to bottom,
              #FF0000 0%,
              #FF0099 10%,
              #CD00FF 20%,
              #3200FF 30%,
              #0066FF 40%,
              #00FFFD 50%,
              #00FF66 60%,
              #35FF00 70%,
              #CDFF00 80%,
              #FF9900 90%,
              #FF0000 100%
            )`,
          }}
          pointerStyle={{
            boxShadow: 'inset 0 0 0 1px #ccc,0 1px 2px #ccc',
            borderRadius: '100%',
          }} />

        {this.props.opacity && (
          <Slider
            className="OpacitySlider"
            type="opacity"
            value={a}
            max={1}
            background={this.getBackgroundGradient()}
            onChange={this.handleAlphaChange}
            onComplete={this.showLastValue}
            style={{
              bottom: '1.3em',
              right: '2.5em',
              height: 8,
              background: '#fff url("data:image/gif;base64,R0lGODdhEAAQAPEAAMvLy8zMzP///wAAACwAAAAAEAAQAEACHYxvosstCAEMrq6Jj812Y59NIDQipdY5XLWqH4sVADs=") repeat',
              backgroundSize: '8px 8px',
            }}
            trackStyle={{
              borderRadius: '1em',
              background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, #FFF 100%)',
            }}
            pointerStyle={{
              boxShadow: 'inset 0 0 0 1px #ccc,0 1px 2px #ccc',
              borderRadius: '100%',
            }} />
        )}

        <Map
          x={s}
          y={v}
          max={100}
          backgroundColor={this.getBackgroundHue()}
          onChange={this.handleSaturationValueChange}
          onComplete={this.showLastValue}
          style={{
            top: 0,
            left: 0,
            right: '2.5em',
            bottom: this.props.opacity ? '2.5em' : '1.3em'
          }}
          pointerStyle={{
            borderColor: !tinycolor(this.state.color).isDark() ? "#000" : "#fff"
          }}
        />
      </div>
    );
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onComplete: PropTypes.func,
};

ColorPicker.defaultProps = {
  color: 'rgba(0,0,0,1)',
};

export default ColorPicker;
