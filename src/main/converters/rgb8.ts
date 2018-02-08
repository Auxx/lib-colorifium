import { HSL, HSV, RGB8, RGBF, XYZ } from '../interfaces/color-models';
import { FromRGBF } from './rgbf';
import { HexHelper } from '../util/helpers';

/**
 * Converter from 8 bit RGB colour model representation into other supported colour models.
 * sRGB colour space with D65 white point is assumed.
 */
export class FromRGB8 {
  /**
   * Converts RGB8 object to RGBF.
   * @param {RGB8} rgb
   * @returns {RGBF}
   */
  static toRGBF(rgb: RGB8): RGBF;
  /**
   * Converts RGB 8 bit values to RGBF.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {RGBF}
   */
  static toRGBF(r: number, g: number, b: number): RGBF;
  static toRGBF(r: any, g?: number, b?: number): RGBF {
    const args = FromRGB8.resolveArguments(r, g, b);

    return {
      r: args.r / 255,
      g: args.g / 255,
      b: args.b / 255
    };
  }

  /**
   * Converts RGB8 object to HSL.
   * @param {RGB8} rgb
   * @returns {HSL}
   */
  static toHSL(rgb: RGB8): HSL;
  /**
   * Converts RGB 8 bit values to HSL.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {HSL}
   */
  static toHSL(r: number, g: number, b: number): HSL;
  static toHSL(r: any, g?: number, b?: number): HSL {
    return FromRGBF.toHSL(FromRGB8.toRGBF(r, g, b));
  }

  /**
   * Converts RGB8 object to HSV.
   * @param {RGB8} rgb
   * @returns {HSV}
   */
  static toHSV(rgb: RGB8): HSV;
  /**
   * Converts RGB 8 bit values to HSV.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {HSV}
   */
  static toHSV(r: number, g: number, b: number): HSV;
  static toHSV(r: any, g?: number, b?: number): HSV {
    return FromRGBF.toHSV(FromRGB8.toRGBF(r, g, b));
  }

  /**
   * Converts RGB8 object to XYZ.
   * @param {RGB8} rgb
   * @returns {XYZ}
   */
  static toXYZ(rgb: RGB8): XYZ;
  /**
   * Converts RGB 8 bit values to XYZ.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {XYZ}
   */
  static toXYZ(r: number, g: number, b: number): XYZ;
  static toXYZ(r: any, g?: number, b?: number): XYZ {
    return FromRGBF.toXYZ(FromRGB8.toRGBF(r, g, b));
  }

  /**
   * Converts RGB8 object to hexadecimal representation.
   * @param {RGB8} rgb
   * @returns {string}
   */
  static toHex(rgb: RGB8): string;
  /**
   * Converts RGB 8 bit values to hexadecimal representation.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {string}
   */
  static toHex(r: number, g: number, b: number): string;
  static toHex(r: any, g?: number, b?: number): string {
    const args = FromRGB8.resolveArguments(r, g, b);
    return `${HexHelper.numberToHex(args.r)}${HexHelper.numberToHex(args.g)}${HexHelper.numberToHex(args.b)}`;
  }

  /**
   * Converts RGB8 object to hexadecimal representation with alpha component as the suffix.
   * @param {RGB8} rgb
   * @param {number} alpha
   * @returns {string}
   */
  static toRGBAHex(rgb: RGB8, alpha: number): string;
  /**
   * Converts RGB 8 bit values to hexadecimal representation with alpha component as the suffix.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   * @returns {string}
   */
  static toRGBAHex(r: number, g: number, b: number, a: number): string;
  static toRGBAHex(r: any, g: number, b?: number, a?: number): string {
    const args = FromRGB8.resolveRGBAArguments(r, g, b, a);
    return `${FromRGB8.toHex(args)}${HexHelper.numberToHex(args.a)}`;
  }

  /**
   * Converts RGB8 object to hexadecimal representation with alpha component as the prefix.
   * @param {RGB8} rgb
   * @param {number} alpha
   * @returns {string}
   */
  static toARGBHex(rgb: RGB8, alpha: number): string;
  /**
   * Converts RGB 8 bit values to hexadecimal representation with alpha component as the prefix.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} a
   * @returns {string}
   */
  static toARGBHex(r: number, g: number, b: number, a: number): string;
  static toARGBHex(r: any, g: number, b?: number, a?: number): string {
    const args = FromRGB8.resolveRGBAArguments(r, g, b, a);
    return `${HexHelper.numberToHex(args.a)}${FromRGB8.toHex(args)}`;
  }

  /**
   * Converts RGB8 object to CSS RGB notation.
   * @param {RGB8} rgb
   * @returns {string}
   */
  static toCssRgb(rgb: RGB8): string;
  /**
   * Converts RGB 8 bit values to CSS RGB notation.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {string}
   */
  static toCssRgb(r: number, g: number, b: number): string;
  static toCssRgb(r: any, g?: number, b?: number): string {
    const args = FromRGB8.resolveArguments(r, g, b);
    return `rgb(${args.r}, ${args.g}, ${args.b})`;
  }

  /**
   * Converts RGB8 object to CSS RGBA notation.
   * @param {RGB8} rgb
   * @param {number} alpha
   * @returns {string}
   */
  static toCssRgba(rgb: RGB8, alpha: number): string;
  /**
   * Converts RGB 8 bit values to CSS RGBA notation.
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @param {number} alpha
   * @returns {string}
   */
  static toCssRgba(r: number, g: number, b: number, alpha: number): string;
  static toCssRgba(r: any, g: number, b?: number, a?: number): string {
    const args = FromRGB8.resolveRGBAArguments(r, g, b, a);
    return `rgba(${args.r}, ${args.g}, ${args.b}, ${(args.a / 255).toFixed(2)})`;
  }

  private static resolveArguments(r: any, g?: number, b?: number): RGB8 {
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

  private static resolveRGBAArguments(r: any, g: number, b?: number, a?: number): RGBA {
    const aType = typeof r;
    const bType = typeof g;
    let result: RGBA;

    if (aType === 'object' && r !== null && bType === 'number') {
      result = { r: r.r, g: r.g, b: r.b, a: g };
    } else if (aType === 'number') {
      result = { r: r, g: g, b: b, a: a };
    } else {
      throw new TypeError('Unknown arguments passed');
    }

    return result;
  }
}

interface RGBA extends RGB8 {
  a: number;
}
