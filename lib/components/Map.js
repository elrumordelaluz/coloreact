'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_Component) {
  _inherits(Map, _Component);

  function Map(props) {
    _classCallCheck(this, Map);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Map).call(this, props));

    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    return _this;
  }

  _createClass(Map, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.x !== this.props.x || nextProps.y !== this.props.y;
    }
  }, {
    key: 'getMapStyles',
    value: function getMapStyles() {
      var _Map$defaultStyles = Map.defaultStyles;
      var map = _Map$defaultStyles.map;
      var mapActive = _Map$defaultStyles.mapActive;

      return Object.assign({}, map, this.props.style && this.props.style, this.props.active && mapActive);
    }
  }, {
    key: 'getPointerStyles',
    value: function getPointerStyles() {
      var _Map$defaultStyles2 = Map.defaultStyles;
      var pointer = _Map$defaultStyles2.pointer;
      var pointerDark = _Map$defaultStyles2.pointerDark;
      var pointerLight = _Map$defaultStyles2.pointerLight;

      return Object.assign({}, pointer, this.props.pointerStyle && this.props.pointerStyle, {
        left: this.props.getPercentageValue(this.props.x),
        bottom: this.props.getPercentageValue(this.props.y)
      });
    }
  }, {
    key: 'getBgStyles',
    value: function getBgStyles() {
      var bg = Map.defaultStyles.bg;
      var backgroundColor = this.props.backgroundColor;

      return Object.assign({}, bg, { backgroundColor: backgroundColor });
    }
  }, {
    key: 'render',
    value: function render() {
      var bgOverlay = Map.defaultStyles.bgOverlay;

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          style: this.getMapStyles(),
          onMouseDown: this.props.startUpdates,
          onTouchStart: this.props.startUpdates },
        _react2.default.createElement(
          'div',
          { className: 'Map__Background', style: this.getBgStyles() },
          _react2.default.createElement('span', { className: 'Map__Background__overlay', style: bgOverlay })
        ),
        this.props.rect && _react2.default.createElement('div', { className: 'Map__Pointer', style: this.getPointerStyles() })
      );
    }
  }]);

  return Map;
}(_react.Component);

Map.propTypes = {
  x: _react2.default.PropTypes.number.isRequired,
  y: _react2.default.PropTypes.number.isRequired,
  backgroundColor: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};

Map.defaultProps = {
  x: 0,
  y: 0,
  backgroundColor: 'transparent',
  className: 'Map'
};

Map.defaultStyles = {
  // Map
  map: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden',
    userSelect: 'none'
  },
  mapActive: {
    cursor: 'none'
  },

  // Pointer
  pointer: {
    position: 'absolute',
    width: 10,
    height: 10,
    marginLeft: -5,
    marginBottom: -5,
    borderRadius: '100%',
    border: '1px solid',
    willChange: 'left, bottom'
  },

  // Background
  bg: {
    top: 0,
    left: 0,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  bgOverlay: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%),\n                 linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)'
  }
};

exports.default = (0, _Draggable2.default)()(Map);