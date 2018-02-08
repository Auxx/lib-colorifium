import { RGB8 } from '../interfaces/color-models';

/**
 * Converter for hexadecimal RGB colour representation.
 */
export class FromHex {
  /**
   * Converts hex colour into RGB8 object.
   * @param {string} hex
   * @returns {RGB8}
   */
  static toRGB8(hex: string): RGB8 {
    const length = hex.length;
    let r;
    let g;
    let b;

    if (length === 3) {
      r = hex[0] + hex[0];
      g = hex[1] + hex[1];
      b = hex[2] + hex[2];
    } else if (length === 6) {
      r = hex.slice(0, 2);
      g = hex.slice(2, 4);
      b = hex.slice(4, 6);
    }

    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
    };
  }
}
