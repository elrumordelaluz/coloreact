import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import * as u from '../utils';
import Slider from './Slider';
import Map from './Map';

class ColorPicker extends Component {
  constructor (props) {
    super(props);
    this.state = {
      color: u.toHSV(this.props.color)
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.handleSaturationValueChange = this.handleSaturationValueChange.bind(this);
    this.handleHueChange = this.handleHueChange.bind(this);
    this.handleAlphaChange = this.handleAlphaChange.bind(this);
    this.showLastValue = this.showLastValue.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (!u.equals(u.toHSV(nextProps.color), this.state.color)) {
      this.setState({
        color: u.toHSV(nextProps.color)
      });
    }
  }

  handleHueChange (hue) {
    const [, s, v, a] = this.state.color;
    this.update([hue, s, v, a]);
  }

  handleSaturationValueChange(saturation, value) {
    const [h, , , a] = this.state.color;
    this.update([h, saturation, value, a]);
  }

  handleAlphaChange (alpha) {
    const [h, s, v] = this.state.color;
    this.update([h, s, v, alpha]);
  }

  getAlpha () {
    return this.state.color[3] === undefined ? 1 : this.state.color[3];
  }

  getBackgroundHue () {
    return u.toRgbString([this.state.color[0], 100, 100]);
  }

  getBackgroundGradient() {
    const [h, s, v] = this.state.color;
    const opaque = u.toRgbString([h, s, v, 1]);
    return `linear-gradient(to right, rgba(0,0,0,0) 0%, ${opaque} 100%)`;
  }

  update (color) {
    this.setState({ color });
    this.props.onChange(this.output());
  }

  output () {
    const { color } = this.state;
    const rgbArr = u.toRGBa(color);
    const hex = u.toHEX(rgbArr);
    const rgbaString = u.toRgbString(color);
    const rgba = {
      r: rgbArr[0],
      g: rgbArr[1],
      b: rgbArr[2],
      a: rgbArr[3]
    }
    const hsv = {
      h: color[0],
      s: color[1],
      v: color[2]
    };

    return { rgba, rgbaString, hex, hsv, };
  }

  showLastValue () {
    this.props.onComplete(this.output());
  }

  render () {
    const [ hue, saturation, value ] = this.state.color;
    const { colorPicker } = ColorPicker.defaultStyles;
    return (
      <div className="ColorPicker" style={colorPicker}>
        <Slider
          className="HueSlider"
          vertical={true}
          value={hue}
          type="hue"
          max={360}
          onChange={this.handleHueChange}
          onComplete={this.showLastValue} />

        {this.props.opacity && (
          <Slider
            className="OpacitySlider"
            type="opacity"
            bottom={true}
            value={this.getAlpha()}
            max={1}
            background={this.getBackgroundGradient()}
            onChange={this.handleAlphaChange}
            onComplete={this.showLastValue} />
        )}

        <Map
          x={saturation}
          y={value}
          max={100}
          pointerColor={!u.isDark(this.state.color) ? "dark" : "light"}
          backgroundColor={this.getBackgroundHue()}
          onChange={this.handleSaturationValueChange}
          onComplete={this.showLastValue}
        />
      </div>
    );
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  color: 'rgba(0,0,0,1)',
};

ColorPicker.defaultStyles = {
  colorPicker: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export default ColorPicker;
