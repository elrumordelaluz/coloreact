import parse from "pure-color/parse";
import rgb2hsv from "pure-color/convert/rgb2hsv";
import hsv2rgb from "pure-color/convert/hsv2rgb";
import rgb2string from "pure-color/convert/rgb2string";
import rgb2grayscale from "pure-color/convert/rgb2grayscale";

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




export function toRgbString(hsv) {
  const rgb = hsv2rgb(hsv);

  if(hsv.length === 4) {
    rgb.push(hsv[3]);
  }

  return rgb2string(rgb);
}

export function equals(hsv1, hsv2) {
  return toRgbString(hsv1) === toRgbString(hsv2);
}

export function isDark(hsv) {
  return rgb2grayscale(hsv2rgb(hsv)) <= 128;
}
