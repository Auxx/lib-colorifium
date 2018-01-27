import { HSL, RGBF } from '../interfaces/color-models';
import { HueHelper } from '../util/helpers';

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

  private static resolveArguments(h: any, s?: number, l?: number): HSL {
    const argumentType = typeof h;
    let result: HSL;

    if (argumentType === 'object' && h !== null) {
      result = { h: h.h, s: h.s, l: h.l };
    } else if (argumentType === 'number') {
      result = { h: h, s: s, l: l };
    } else {
      throw new TypeError('Unknown arguments passed');
    }

    return result;
  }
}
