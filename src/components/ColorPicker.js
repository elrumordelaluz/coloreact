import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as u from '../utils';
import Slider from './Slider';
import Map from './Map';

import classNames from 'classnames/bind';
import styles from './Styles.css';

const cx = classNames.bind(styles);

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
    this.props.onChange(u.toRgbString(color));
  }

  render () {
    const [ hue, saturation, value ] = this.state.color;
    return (
      <div className={cx({
          'ColorPicker': true,
          'with-opacity-slider': this.props.opacitySlider
        })}>
        <div className={cx({ 'Hue-slider': true })}>
          <Slider
            vertical={true}
            value={hue}
            max={360}
            onChange={this.handleHueChange} />
        </div>

        {this.props.opacitySlider && (
          <div className={cx({ 'Opacity-slider': true })}>
            <Slider
              value={this.getAlpha()}
              max={1}
              background={this.getBackgroundGradient()}
              onChange={this.handleAlphaChange}
            />
          </div>
        )}

        <Map
          x={saturation}
          y={value}
          max={100}
          className={u.isDark(this.state.color) ? "dark" : "light"}
          backgroundColor={this.getBackgroundHue()}
          onChange={this.handleSaturationValueChange}
        />
      </div>
    );
  }
}

ColorPicker.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
  color: "rgba(0,0,0,1)"
}

export default ColorPicker;
