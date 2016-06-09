"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDark = exports.equals = exports.toRgbString = exports.toRGBa = exports.toHSV = exports.toHEX = undefined;

var _parse = require("pure-color/parse");

var _parse2 = _interopRequireDefault(_parse);

var _rgb2hsv = require("pure-color/convert/rgb2hsv");

var _rgb2hsv2 = _interopRequireDefault(_rgb2hsv);

var _hsv2rgb = require("pure-color/convert/hsv2rgb");

var _hsv2rgb2 = _interopRequireDefault(_hsv2rgb);

var _rgb2string = require("pure-color/convert/rgb2string");

var _rgb2string2 = _interopRequireDefault(_rgb2string);

var _rgb2hex = require("pure-color/convert/rgb2hex");

var _rgb2hex2 = _interopRequireDefault(_rgb2hex);

var _rgb2grayscale = require("pure-color/convert/rgb2grayscale");

var _rgb2grayscale2 = _interopRequireDefault(_rgb2grayscale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var toHEX = exports.toHEX = function toHEX(rgb) {
  return (0, _rgb2hex2.default)(rgb);
};

/**
 * Parse String to Hue-Saturation-Value
 * @param  {String} color
 * @return {Array}
 */
var toHSV = exports.toHSV = function toHSV(color) {
  var parsedColor = (0, _parse2.default)(color);
  var hsv = (0, _rgb2hsv2.default)(parsedColor);
  var alpha = parsedColor.length === 4 ? parsedColor[3] : 1;
  return [].concat(_toConsumableArray(hsv), [alpha]);
};

/**
 * Transform Hue-Saturation-Value into rgba String
 * @param  {Array} hsv
 * @return {String}
 */
var toRGBa = exports.toRGBa = function toRGBa(hsv) {
  var rgb = (0, _hsv2rgb2.default)(hsv);
  return [].concat(_toConsumableArray(rgb), [hsv.length === 4 ? hsv[3].toFixed(2) : 1]);
};

/**
 * Transform Hue-Saturation-Value into rgba String
 * @param  {Array} hsv
 * @return {String}
 */
var toRgbString = exports.toRgbString = function toRgbString(hsv) {
  var rgb = (0, _hsv2rgb2.default)(hsv);
  return (0, _rgb2string2.default)([].concat(_toConsumableArray(rgb), [hsv.length === 4 ? hsv[3].toFixed(2) : 1]));
};

/**
 * Determine if two Hue-Saturation-Value arrays are equals
 * @param  {Array} a
 * @param  {Array} b
 * @return {Boolean}
 */
var equals = exports.equals = function equals(a, b) {
  return toRgbString(a) === toRgbString(b);
};

/**
 * Determine if color is dark
 * @param  {Array} hsv Hue-Saturation-Value
 * @return {Boolean}
 */
var isDark = exports.isDark = function isDark(hsv) {
  return (0, _rgb2grayscale2.default)((0, _hsv2rgb2.default)(hsv)) <= 128;
};