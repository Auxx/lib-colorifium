import { RGB8, RGBF, Lab, XYZ } from '../';
import { XYZHelper } from '../util/helpers';
import { XYZRefs } from '../util/xyz-refs';
import { FromXYZ } from './xyz';

export class FromLab {
  /**
   * Converts Lab object to XYZ.
   * @param {Lab} lab
   * @returns {XYZ}
   */
  static toXYZ(lab: Lab): XYZ;
  /**
   * Converts Lab values to XYZ.
   * @param {number} l
   * @param {number} a
   * @param {number} b
   * @returns {XYZ}
   */
  static toXYZ(l: number, a: number, b: number): XYZ;
  static toXYZ(l: any, a?: number, b?: number): XYZ {
    const args = FromLab.resolveArguments(l, a, b);

    let y = ( args.l + 16 ) / 116;
    let x = args.a / 500 + y;
    let z = y - args.b / 200;

    x = XYZHelper.pivotFromLab(x);
    y = XYZHelper.pivotFromLab(y);
    z = XYZHelper.pivotFromLab(z);

    // We assume D65 at 2deg illuminant here which corresponds to sRGB.
    return {
      x: x * XYZRefs.D65_2d.x,
      y: y * XYZRefs.D65_2d.y,
      z: z * XYZRefs.D65_2d.z
    };
  }

  /**
   * Converts Lab object to RGBF.
   * @param {Lab} lab
   * @returns {RGBF}
   */
  static toRGBF(lab: Lab): RGBF;
  /**
   * Converts Lab values to RGBF.
   * @param {number} l
   * @param {number} a
   * @param {number} b
   * @returns {RGBF}
   */
  static toRGBF(l: number, a: number, b: number): RGBF;
  static toRGBF(l: any, a?: number, b?: number): RGBF {
    return FromXYZ.toRGBF(FromLab.toXYZ(l, a, b));
  }

  /**
   * Converts Lab object to RGB8.
   * @param {Lab} lab
   * @returns {RGB8}
   */
  static toRGB8(lab: Lab): RGB8;
  /**
   * Converts Lab values to XYZ.
   * @param {number} l
   * @param {number} a
   * @param {number} b
   * @returns {RGB8}
   */
  static toRGB8(l: number, a: number, b: number): RGB8;
  static toRGB8(l: any, a?: number, b?: number): RGB8 {
    return FromXYZ.toRGB8(FromLab.toXYZ(l, a, b));
  }

  private static resolveArguments(l: any, a?: number, b?: number): Lab {
    const argumentType = typeof l;

    if (argumentType === 'object' && l !== null) {
      return { l: l.l, a: l.a, b: l.b };
    }

    if (argumentType === 'number') {
      return { l: l, a: a, b: b };
    }

    throw new TypeError('Unknown arguments passed');
  }
}
