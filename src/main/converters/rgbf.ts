import { HSL, HSV, RGB8, RGBF, XYZ } from '../interfaces/color-models';
import { HueHelper, XYZHelper } from '../util/helpers';
import { Matrix } from '../util/matrix';

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

  /**
   * Converts RGBF object to HSV.
   * @param {RGBF} rgb
   * @returns {HSV}
   */
  static toHSV(rgb: RGBF): HSV;
  /**
   * Converts RGBF values to HSV.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {HSV}
   */
  static toHSV(r: number, g: number, b: number): HSV;
  static toHSV(r: any, g?: number, b?: number): HSV {
    const args = FromRGBF.resolveArguments(r, g, b);
    const basis = HueHelper.calculateBasisFromRGBF(args);

    return {
      h: basis.hue,
      s: basis.max === 0 ? 0 : basis.delta / basis.max,
      v: basis.max
    };
  }

  /**
   * Converts RGBF object to XYZ.
   * @param {RGBF} rgb
   * @returns {XYZ}
   */
  static toXYZ(rgb: RGBF): XYZ;
  /**
   * Converts RGBF values to XYZ.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {XYZ}
   */
  static toXYZ(r: number, g: number, b: number): XYZ;
  static toXYZ(r: any, g?: number, b?: number): XYZ {
    const args = FromRGBF.resolveArguments(r, g, b);

    const pr = XYZHelper.pivotRGB(args.r);
    const pg = XYZHelper.pivotRGB(args.g);
    const pb = XYZHelper.pivotRGB(args.b);

    return {
      x: pr * Matrix.sRGBtoXYZ.r[0] + pg * Matrix.sRGBtoXYZ.r[1] + pb * Matrix.sRGBtoXYZ.r[2],
      y: pr * Matrix.sRGBtoXYZ.g[0] + pg * Matrix.sRGBtoXYZ.g[1] + pb * Matrix.sRGBtoXYZ.g[2],
      z: pr * Matrix.sRGBtoXYZ.b[0] + pg * Matrix.sRGBtoXYZ.b[1] + pb * Matrix.sRGBtoXYZ.b[2]
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
