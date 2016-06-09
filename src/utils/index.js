import parse from "pure-color/parse";
import rgb2hsv from "pure-color/convert/rgb2hsv";
import hsv2rgb from "pure-color/convert/hsv2rgb";
import rgb2string from "pure-color/convert/rgb2string";
import rgb2hex from "pure-color/convert/rgb2hex";
import rgb2grayscale from "pure-color/convert/rgb2grayscale";

export const toHEX = (rgb) => rgb2hex(rgb);

/**
 * Parse String to Hue-Saturation-Value
 * @param  {String} color
 * @return {Array}
 */
export const toHSV = (color) => {
  const parsedColor = parse(color);
  const hsv = rgb2hsv(parsedColor);
  const alpha = parsedColor.length === 4 ? parsedColor[3] : 1;
  return [ ...hsv, alpha ];
};

/**
 * Transform Hue-Saturation-Value into rgba String
 * @param  {Array} hsv
 * @return {String}
 */
export const toRGBa = (hsv) => {
  const rgb = hsv2rgb(hsv);
  return [
    ...rgb,
    hsv.length === 4 ? hsv[3].toFixed(2) : 1
  ];
}

/**
 * Transform Hue-Saturation-Value into rgba String
 * @param  {Array} hsv
 * @return {String}
 */
export const toRgbString = (hsv) => {
  const rgb = hsv2rgb(hsv);
  return rgb2string([
    ...rgb,
    hsv.length === 4 ? hsv[3].toFixed(2) : 1
  ]);
}

/**
 * Determine if two Hue-Saturation-Value arrays are equals
 * @param  {Array} a
 * @param  {Array} b
 * @return {Boolean}
 */
export const equals = (a,b) => toRgbString(a) === toRgbString(b);

/**
 * Determine if color is dark
 * @param  {Array} hsv Hue-Saturation-Value
 * @return {Boolean}
 */
export const isDark = (hsv) => rgb2grayscale(hsv2rgb(hsv)) <= 128;
