'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _horizontalSlider;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Slider, [{
    key: 'getPointerStyles',
    value: function getPointerStyles() {
      var pointer = Slider.defaultStyles.pointer;

      var attr = this.props.vertical ? 'bottom' : 'left';

      return Object.assign({}, pointer, _defineProperty({}, attr, this.props.getPercentageValue(this.props.value)));
    }
  }, {
    key: 'getSliderStyles',
    value: function getSliderStyles() {
      var _Slider$defaultStyles = Slider.defaultStyles;
      var slider = _Slider$defaultStyles.slider;
      var verticalSlider = _Slider$defaultStyles.verticalSlider;
      var horizontalSlider = _Slider$defaultStyles.horizontalSlider;
      var opacitySlider = _Slider$defaultStyles.opacitySlider;
      var rightSlider = _Slider$defaultStyles.rightSlider;
      var bottomSlider = _Slider$defaultStyles.bottomSlider;


      return Object.assign({}, slider, rightSlider, this.props.bottom && bottomSlider, this.props.vertical && verticalSlider, !this.props.vertical && horizontalSlider, this.props.opacity && opacitySlider);
    }
  }, {
    key: 'getTrackStyles',
    value: function getTrackStyles() {
      var _Slider$defaultStyles2 = Slider.defaultStyles;
      var track = _Slider$defaultStyles2.track;
      var horizontalTrack = _Slider$defaultStyles2.horizontalTrack;
      var verticalTrack = _Slider$defaultStyles2.verticalTrack;
      var opacityTrack = _Slider$defaultStyles2.opacityTrack;
      var hueTrack = _Slider$defaultStyles2.hueTrack;

      var background = this.props.background;
      return Object.assign({}, track, this.props.vertical && verticalTrack, !this.props.vertical && horizontalTrack, this.props.type === 'opacity' && opacityTrack, this.props.type === 'hue' && hueTrack, this.props.background && { background: this.props.background });
    }
  }, {
    key: 'render',
    value: function render() {
      var _Slider$defaultStyles3 = Slider.defaultStyles;
      var opacitySlider = _Slider$defaultStyles3.opacitySlider;
      var opacitySlider__track = _Slider$defaultStyles3.opacitySlider__track;

      return _react2.default.createElement(
        'div',
        {
          className: 'Slider ' + this.props.className,
          style: this.getSliderStyles(),
          onMouseDown: this.props.startUpdates,
          onTouchStart: this.props.startUpdates },
        _react2.default.createElement('div', { className: 'Track', style: this.getTrackStyles() }),
        this.props.rect && _react2.default.createElement('div', { className: 'Pointer', style: this.getPointerStyles() })
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  value: _react.PropTypes.number.isRequired,
  background: _react.PropTypes.string
};

Slider.defaultProps = {
  value: 0,
  background: ''
};

Slider.defaultStyles = {
  // Slider
  slider: {
    position: 'absolute',
    userSelect: 'none'
  },
  horizontalSlider: (_horizontalSlider = {
    height: 8,
    left: '2.5em',
    right: '2.5em'
  }, _defineProperty(_horizontalSlider, 'height', 10), _defineProperty(_horizontalSlider, 'cursor', 'ew-resize'), _horizontalSlider),
  verticalSlider: {
    top: '2.5em',
    bottom: '2.5em',
    width: 10,
    cursor: 'ns-resize'
  },
  opacitySlider: {
    background: '#fff url("data:image/gif;base64,R0lGODdhEAAQAPEAAMvLy8zMzP///wAAACwAAAAAEAAQAEACHYxvosstCAEMrq6Jj812Y59NIDQipdY5XLWqH4sVADs=") repeat',
    backgroundSize: '8px 8px'
  },
  rightSlider: {
    right: '1.3em'
  },
  bottomSlider: {
    bottom: '1.3em'
  },

  // Track
  track: {
    borderRadius: 3,
    background: '#888'
  },
  horizontalTrack: {
    height: 8,
    marginTop: -4,
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%'
  },
  verticalTrack: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    left: '50%',
    width: 8,
    marginLeft: -4
  },
  opacityTrack: {
    background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, #FFF 100%)'
  },
  hueTrack: {
    background: 'linear-gradient(to bottom,\n      #FF0000 0%,\n      #FF0099 10%,\n      #CD00FF 20%,\n      #3200FF 30%,\n      #0066FF 40%,\n      #00FFFD 50%,\n      #00FF66 60%,\n      #35FF00 70%,\n      #CDFF00 80%,\n      #FF9900 90%,\n      #FF0000 100%\n    )'
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
    willChange: 'left, bottom'
  }
};

exports.default = (0, _Draggable2.default)({ single: true })(Slider);