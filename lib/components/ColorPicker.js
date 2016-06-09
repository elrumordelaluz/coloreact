'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _utils = require('../utils');

var u = _interopRequireWildcard(_utils);

var _Slider = require('./Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColorPicker).call(this, props));

    _this.state = {
      color: u.toHSV(_this.props.color)
    };
    _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
    _this.handleSaturationValueChange = _this.handleSaturationValueChange.bind(_this);
    _this.handleHueChange = _this.handleHueChange.bind(_this);
    _this.handleAlphaChange = _this.handleAlphaChange.bind(_this);
    _this.showLastValue = _this.showLastValue.bind(_this);
    return _this;
  }

  _createClass(ColorPicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!u.equals(u.toHSV(nextProps.color), this.state.color)) {
        this.setState({
          color: u.toHSV(nextProps.color)
        });
      }
    }
  }, {
    key: 'handleHueChange',
    value: function handleHueChange(hue) {
      var _state$color = _slicedToArray(this.state.color, 4);

      var s = _state$color[1];
      var v = _state$color[2];
      var a = _state$color[3];

      this.update([hue, s, v, a]);
    }
  }, {
    key: 'handleSaturationValueChange',
    value: function handleSaturationValueChange(saturation, value) {
      var _state$color2 = _slicedToArray(this.state.color, 4);

      var h = _state$color2[0];
      var a = _state$color2[3];

      this.update([h, saturation, value, a]);
    }
  }, {
    key: 'handleAlphaChange',
    value: function handleAlphaChange(alpha) {
      var _state$color3 = _slicedToArray(this.state.color, 3);

      var h = _state$color3[0];
      var s = _state$color3[1];
      var v = _state$color3[2];

      this.update([h, s, v, alpha]);
    }
  }, {
    key: 'getAlpha',
    value: function getAlpha() {
      return this.state.color[3] === undefined ? 1 : this.state.color[3];
    }
  }, {
    key: 'getBackgroundHue',
    value: function getBackgroundHue() {
      return u.toRgbString([this.state.color[0], 100, 100]);
    }
  }, {
    key: 'getBackgroundGradient',
    value: function getBackgroundGradient() {
      var _state$color4 = _slicedToArray(this.state.color, 3);

      var h = _state$color4[0];
      var s = _state$color4[1];
      var v = _state$color4[2];

      var opaque = u.toRgbString([h, s, v, 1]);
      return 'linear-gradient(to right, rgba(0,0,0,0) 0%, ' + opaque + ' 100%)';
    }
  }, {
    key: 'update',
    value: function update(color) {
      this.setState({ color: color });
      this.props.onChange(this.output());
    }
  }, {
    key: 'output',
    value: function output() {
      var color = this.state.color;

      var rgbArr = u.toRGBa(color);
      var hex = u.toHEX(rgbArr);
      var rgbaString = u.toRgbString(color);
      var rgba = {
        r: rgbArr[0],
        g: rgbArr[1],
        b: rgbArr[2],
        a: rgbArr[3]
      };
      var hsv = {
        h: color[0],
        s: color[1],
        v: color[2]
      };

      return { rgba: rgba, rgbaString: rgbaString, hex: hex, hsv: hsv };
    }
  }, {
    key: 'showLastValue',
    value: function showLastValue() {
      this.props.onComplete(this.output());
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$color5 = _slicedToArray(this.state.color, 3);

      var hue = _state$color5[0];
      var saturation = _state$color5[1];
      var value = _state$color5[2];
      var colorPicker = ColorPicker.defaultStyles.colorPicker;

      return _react2.default.createElement(
        'div',
        { className: 'ColorPicker', style: colorPicker },
        _react2.default.createElement(_Slider2.default, {
          className: 'HueSlider',
          vertical: true,
          value: hue,
          type: 'hue',
          max: 360,
          onChange: this.handleHueChange,
          onComplete: this.showLastValue }),
        this.props.opacity && _react2.default.createElement(_Slider2.default, {
          className: 'OpacitySlider',
          type: 'opacity',
          bottom: true,
          value: this.getAlpha(),
          max: 1,
          background: this.getBackgroundGradient(),
          onChange: this.handleAlphaChange,
          onComplete: this.showLastValue }),
        _react2.default.createElement(_Map2.default, {
          x: saturation,
          y: value,
          max: 100,
          pointerColor: !u.isDark(this.state.color) ? "dark" : "light",
          backgroundColor: this.getBackgroundHue(),
          onChange: this.handleSaturationValueChange,
          onComplete: this.showLastValue
        })
      );
    }
  }]);

  return ColorPicker;
}(_react.Component);

ColorPicker.propTypes = {
  color: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func.isRequired
};

ColorPicker.defaultProps = {
  color: 'rgba(0,0,0,1)'
};

ColorPicker.defaultStyles = {
  colorPicker: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};

exports.default = ColorPicker;