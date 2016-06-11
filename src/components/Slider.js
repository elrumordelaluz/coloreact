import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import draggable from './Draggable';

class Slider extends Component {
  constructor (props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getPointerStyles() {
    const { pointer } = Slider.defaultStyles;
    const attr = this.props.vertical ? 'bottom' : 'left';

    return Object.assign({},
      pointer,
      {
        [attr]: this.props.getPercentageValue(this.props.value)
      },
    );
  }

  getSliderStyles () {
    const {
      slider,
      verticalSlider,
      horizontalSlider,
      opacitySlider,
      rightSlider,
      leftSlider,
      bottomSlider } = Slider.defaultStyles;

    return Object.assign({},
      slider,
      this.props.vertical && this.props.right && rightSlider,
      this.props.vertical && !this.props.right && leftSlider,
      this.props.vertical && verticalSlider,
      !this.props.vertical && horizontalSlider,
      !this.props.vertical && this.props.bottom && bottomSlider,
      this.props.opacity && opacitySlider,
    );
  }

  getTrackStyles () {
    const { track, horizontalTrack, verticalTrack, opacityTrack, hueTrack } = Slider.defaultStyles;
    const background = this.props.background;
    return Object.assign({},
      track,
      this.props.vertical && verticalTrack,
      !this.props.vertical && horizontalTrack,
      this.props.type === 'opacity' && opacityTrack,
      this.props.type === 'hue' && hueTrack,
      this.props.background && { background: this.props.background },
    );
  }

  render () {
    const { opacitySlider, opacitySlider__track }= Slider.defaultStyles;
    return (
      <div
        className={`Slider ${this.props.className}`}
        style={this.getSliderStyles()}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}
        onMouseUp={this.props.onComplete}
        onTouchEnd={this.props.onComplete}>

        <div className="Track" style={this.getTrackStyles()} />

        { this.props.rect && (
          <div className="Pointer" style={this.getPointerStyles()} />
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
    left: '2.5em',
    right: '2.5em',
    height: 10,
    cursor: 'ew-resize',
  },
  verticalSlider: {
    top: '2.5em',
    bottom: '2.5em',
    width: 10,
    cursor: 'ns-resize',
  },
  opacitySlider: {
    background: '#fff url("data:image/gif;base64,R0lGODdhEAAQAPEAAMvLy8zMzP///wAAACwAAAAAEAAQAEACHYxvosstCAEMrq6Jj812Y59NIDQipdY5XLWqH4sVADs=") repeat',
    backgroundSize: '8px 8px',
  },
  rightSlider: {
    right: '1.3em'
  },
  bottomSlider: {
    bottom: '1.3em',
  },
  leftSlider: {
    left: '1.3em'
  },

  // Track
  track: {
    borderRadius: 3,
    background: '#888',
  },
  horizontalTrack: {
    height: 8,
    marginTop: -4,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
  },
  verticalTrack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: '50%',
    width: 8,
    marginLeft: -4,
  },
  opacityTrack: {
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, #FFF 100%)',
  },
  hueTrack: {
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
    borderRadius: 16,
    background: '#fff',
    boxShadow: 'inset 0 0 0 1px #ccc,0 1px 2px #ccc',
    willChange: 'left, bottom',
  },
};

export default draggable({ single: true })(Slider);
