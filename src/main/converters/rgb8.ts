import { RGB8, RGBF } from '../interfaces/color-models';

/**
 * Converter from 8 bit RGB colour model representation into other supported colour models.
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
}
