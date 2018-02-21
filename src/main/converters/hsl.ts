import { HSL, RGB8, RGBF } from '../interfaces/color-models';
import { HueHelper } from '../util/helpers';
import { FromRGBF } from './rgbf';

/**
 * Converts HSL colours for either RGB 8 bit or RGB float.
 * HSL colour space is known as HSB in Photoshop.
 */
export class FromHSL {
  /**
   * Converts HSL object to RGBF.
   * @param {HSL} hsl
   * @returns {RGBF}
   */
  static toRGBF(hsl: HSL): RGBF;
  /**
   * Converts HSL values to RGBF.
   * @param {number} h
   * @param {number} s
   * @param {number} l
   * @returns {RGBF}
   */
  static toRGBF(h: number, s: number, l: number): RGBF;
  static toRGBF(h: any, s?: number, l?: number): RGBF {
    const args = FromHSL.resolveArguments(h, s, l);

    if (args.s === 0) {
      return {
        r: l,
        g: l,
        b: l
      };
    } else {
      const C = (1 - Math.abs(2 * args.l - 1)) * args.s;
      const X = C * (1 - Math.abs((args.h / 60) % 2 - 1));
      const m = args.l - C / 2;

      if (args.h < 60) {
        return HueHelper.hueToRgbMatrix(C, X, 0, m);
      }

      if (args.h < 120) {
        return HueHelper.hueToRgbMatrix(X, C, 0, m);
      }

      if (args.h < 180) {
        return HueHelper.hueToRgbMatrix(0, C, X, m);
      }

      if (args.h < 240) {
        return HueHelper.hueToRgbMatrix(0, X, C, m);
      }

      if (args.h < 300) {
        return HueHelper.hueToRgbMatrix(X, 0, C, m);
      }

      return HueHelper.hueToRgbMatrix(C, 0, X, m);
    }
  }

  /**
   * Converts HSL object to RGB8.
   * @param {HSL} hsl
   * @returns {RGB8}
   */
  static toRGB8(hsl: HSL): RGB8;
  /**
   * Converts HSL values to RGB8.
   * @param {number} h
   * @param {number} s
   * @param {number} l
   * @returns {RGB8}
   */
  static toRGB8(h: number, s: number, l: number): RGB8;
  static toRGB8(h: any, s?: number, l?: number): RGB8 {
    return FromRGBF.toRGB8(FromHSL.toRGBF(h, s, l));
  }

  private static resolveArguments(h: any, s?: number, l?: number): HSL {
    const argumentType = typeof h;

    if (argumentType === 'object' && h !== null) {
      return { h: h.h, s: h.s, l: h.l };
    }

    if (argumentType === 'number') {
      return { h: h, s: s, l: l };
    }

    throw new TypeError('Unknown arguments passed');
  }
}
