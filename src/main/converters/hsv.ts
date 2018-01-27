import { HSV, RGB8, RGBF } from '../interfaces/color-models';
import { HueHelper } from '../util/helpers';
import { FromRGBF } from './rgbf';

/**
 * Converts HSL colours for either RGB 8 bit or RGB float.
 * HSV is an alternative version of HSL. Hue component is the same,
 * but S and V are calculated a bit differently from S and L in HSL.
 */
export class FromHSV {
  /**
   * Converts HSV object to RGBF.
   * @param {HSV} hsv
   * @returns {RGBF}
   */
  static toRGBF(hsv: HSV): RGBF;
  /**
   * Converts HSV values to RGBF.
   * @param {number} h
   * @param {number} s
   * @param {number} v
   * @returns {RGBF}
   */
  static toRGBF(h: number, s: number, v: number): RGBF;
  static toRGBF(h: any, s?: number, v?: number): RGBF {
    const args = FromHSV.resolveArguments(h, s, v);

    if (args.s === 0) {
      return {
        r: v,
        g: v,
        b: v
      };
    } else {
      const C = args.v * args.s;
      const X = C * (1 - Math.abs((args.h / 60) % 2 - 1));
      const m = args.v - C;

      if (args.h < 60) {
        return HueHelper.hueToRgbMatrix(C, X, 0, m);
      } else if (args.h < 120) {
        return HueHelper.hueToRgbMatrix(X, C, 0, m);
      } else if (args.h < 180) {
        return HueHelper.hueToRgbMatrix(0, C, X, m);
      } else if (args.h < 240) {
        return HueHelper.hueToRgbMatrix(0, X, C, m);
      } else if (args.h < 300) {
        return HueHelper.hueToRgbMatrix(X, 0, C, m);
      } else {
        return HueHelper.hueToRgbMatrix(C, 0, X, m);
      }
    }
  }

  /**
   * Converts HSV object to RGB8.
   * @param {HSV} hsv
   * @returns {RGB8}
   */
  static toRGB8(hsv: HSV): RGB8;
  /**
   * Converts HSV values to RGB8.
   * @param {number} h
   * @param {number} s
   * @param {number} v
   * @returns {RGB8}
   */
  static toRGB8(h: number, s: number, v: number): RGB8;
  static toRGB8(h: any, s?: number, v?: number): RGB8 {
    return FromRGBF.toRGB8(FromHSV.toRGBF(h, s, v));
  }

  private static resolveArguments(h: any, s?: number, v?: number): HSV {
    const argumentType = typeof h;
    let result: HSV;

    if (argumentType === 'object' && h !== null) {
      result = { h: h.h, s: h.s, v: h.v };
    } else if (argumentType === 'number') {
      result = { h: h, s: s, v: v };
    } else {
      throw new TypeError('Unknown arguments passed');
    }

    return result;
  }
}
