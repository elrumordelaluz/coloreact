import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import draggable from './Draggable';

class Map extends Component {
  constructor (props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  getMapStyles () {
    const { map, mapActive } = Map.defaultStyles;
    return Object.assign({}, map, this.props.active && mapActive);
  }

  getPointerStyles () {
    const { pointer, pointerDark, pointerLight } = Map.defaultStyles;
    return Object.assign({},
      pointer,
      {
        left: this.props.getPercentageValue(this.props.x),
        bottom: this.props.getPercentageValue(this.props.y)
      },
      this.props.pointerColor === 'dark' && pointerDark,
      this.props.pointerColor === 'light' && pointerLight,
    );
  }

  getBgStyles () {
    const { bg } = Map.defaultStyles;
    const { backgroundColor } = this.props;
    return Object.assign({}, bg, { backgroundColor });
  }

  render () {
    const { bgOverlay } = Map.defaultStyles;
    return (
      <div
        className="Map"
        style={this.getMapStyles()}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}>

        <div className="Background" style={this.getBgStyles()}>
          <span className="Background__overlay" style={bgOverlay} />
        </div>

        { this.props.rect && (
          <div className="Pointer" style={this.getPointerStyles()} />
        )}
      </div>
    );
  }
}

Map.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  backgroundColor: React.PropTypes.string,
  className: React.PropTypes.string,
};

Map.defaultProps = {
  x: 0,
  y: 0,
  backgroundColor: "transparent",
  className: "",
};

Map.defaultStyles = {
  // Map
  map: {
    position: 'absolute',
    top: '1em',
    bottom: '1em',
    right: '2em',
    left: '1em',
    overflow: 'hidden',
    userSelect: 'none',
    borderRadius: '.25em',
  },
  mapActive: {
    cursor: 'none',
  },

  // Pointer
  pointer: {
    position: 'absolute',
    width: 10,
    height: 10,
    marginLeft: -5,
    marginBottom: -5,
    borderRadius: '100%',
    border: '1px solid #000',
    willChange: 'left, bottom',
  },
  pointerDark: {
    borderColor: '#000',
  },
  pointerLight: {
    borderColor: '#fff',
  },

  // Background
  bg: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  bgOverlay: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%),
                 linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)`,
  },
};

export default draggable()(Map);
