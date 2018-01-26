import { RGB8, RGBF } from '../interfaces/color-models';

/**
 * Converter from float number RGB colour model representation into other supported colour models.
 */
export class FromRGBF {
  /**
   * Converts RGBF object to RGB8
   * @param {RGBF} rgb
   * @returns {RGB8}
   */
  static toRGB8(rgb: RGBF): RGB8;
  /**
   * Converts RGBF values to RGB8
   * @param {number} r
   * @param {number} g
   * @param {number} b
   * @returns {RGB8}
   */
  static toRGB8(r: number, g: number, b: number): RGB8;
  static toRGB8(r: any, g?: number, b?: number): RGB8 {
    const argumentType = typeof r;
    let result: RGB8;

    if (argumentType === 'object' && r !== null) {
      result = { r: r.r, g: r.g, b: r.b };
    } else if (argumentType === 'number') {
      result = { r: r, g: g, b: b };
    }

    return {
      r: Math.round(result.r * 255),
      g: Math.round(result.g * 255),
      b: Math.round(result.b * 255)
    };
  }
}
