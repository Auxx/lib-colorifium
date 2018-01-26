import { RGB8, RGBF } from '../interfaces/color-models';

/**
 * Converter from float number RGB colour model representation into other supported colour models.
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
