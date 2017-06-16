import React, { Component } from 'react';
import PropTypes from 'prop-types';
import draggable from './Draggable';

class Slider extends Component {
  getPointerStyles() {
    const { pointer } = Slider.defaultStyles;
    const attr = this.props.vertical ? 'bottom' : 'left';
    return Object.assign({},
      pointer,
      this.props.pointerStyle && this.props.pointerStyle,
      {
        [attr]: this.props.getPercentageValue(this.props.value)
      },
    );
  }

  getSliderStyles () {
    const { slider, verticalSlider, horizontalSlider } = Slider.defaultStyles;
    return Object.assign({},
      slider,
      this.props.vertical && verticalSlider,
      !this.props.vertical && horizontalSlider,
      this.props.style && this.props.style,
    );
  }

  getTrackStyles () {
    const { track, horizontalTrack, verticalTrack, opacityTrack, hueTrack } = Slider.defaultStyles;
    const background = this.props.background;
    return Object.assign({},
      track,
      this.props.vertical && verticalTrack,
      !this.props.vertical && horizontalTrack,
      this.props.trackStyle && this.props.trackStyle,
      this.props.background && { background: this.props.background },
    );
  }

  render () {
    const { opacitySlider, opacitySlider__track }= Slider.defaultStyles;
    return (
      <div
        className={this.props.className || 'Slider'}
        style={this.getSliderStyles()}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}>

        <div className="Slider__Track" style={this.getTrackStyles()} />

        { this.props.rect && (
          <div className="Slider__Pointer" style={this.getPointerStyles()} />
        )}
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  background: PropTypes.string,
};

Slider.defaultProps = {
  value: 0,
  background: '',
};

Slider.defaultStyles = {
  // Slider
  slider: {
    position: 'absolute',
    userSelect: 'none',
  },
  horizontalSlider: {
    height: 8,
    left: 0,
    right: 0,
    height: 10,
    cursor: 'ew-resize',
  },
  verticalSlider: {
    top: 0,
    bottom: 0,
    width: 10,
    cursor: 'ns-resize',
  },

  // Track
  track: {
    background: '#efefef',
    position: 'absolute',
  },
  horizontalTrack: {
    height: '100%',
    left: 0,
    right: 0,
  },
  verticalTrack: {
    bottom: 0,
    top: 0,
    width: '100%',
  },

  // Pointer
  pointer: {
    position: 'absolute',
    bottom: '50%',
    left: '50%',
    width: 16,
    height: 16,
    marginLeft: -8,
    marginBottom: -8,
    background: '#efefef',
    willChange: 'auto',
  },
};

export default draggable({ single: true })(Slider);
