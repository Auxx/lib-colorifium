import { HSL, RGB8, RGBF } from '../interfaces/color-models';
import { HueHelper } from '../util/helpers';

/**
 * Converter from float number RGB colour model representation into other supported colour models.
 * sRGB colour space with D65 white point is assumed.
 */
export class FromRGBF {
  /**
   * Converts RGBF object to RGB8.
   * @param {RGBF} rgb
   * @returns {RGB8}
   */
  static toRGB8(rgb: RGBF): RGB8;
  /**
   * Converts RGBF values to RGB8.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {RGB8}
   */
  static toRGB8(r: number, g: number, b: number): RGB8;
  static toRGB8(r: any, g?: number, b?: number): RGB8 {
    const args = FromRGBF.resolveArguments(r, g, b);

    return {
      r: Math.round(args.r * 255),
      g: Math.round(args.g * 255),
      b: Math.round(args.b * 255)
    };
  }

  /**
   * Converts RGBF object to HSL.
   * @param {RGBF} rgb
   * @returns {HSL}
   */
  static toHSL(rgb: RGBF): HSL;
  /**
   * Converts RGBF values to HSL.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {HSL}
   */
  static toHSL(r: number, g: number, b: number): HSL;
  static toHSL(r: any, g?: number, b?: number): HSL {
    const args = FromRGBF.resolveArguments(r, g, b);
    const basis = HueHelper.calculateBasisFromRGBF(args);

    const l = (basis.max + basis.min) / 2;
    let s;

    if (basis.delta === 0) {
      s = 0;
    } else {
      s = l < 0.5 ? basis.delta / (basis.max + basis.min) : basis.delta / (2 - basis.max - basis.min);
    }

    return {
      h: basis.hue,
      s: s,
      l: l
    };
  }

  private static resolveArguments(r: any, g?: number, b?: number): RGBF {
    const argumentType = typeof r;
    let result: RGBF;

    if (argumentType === 'object' && r !== null) {
      result = { r: r.r, g: r.g, b: r.b };
    } else if (argumentType === 'number') {
      result = { r: r, g: g, b: b };
    } else {
      throw new TypeError('Unknown arguments passed');
    }

    return result;
  }
}
