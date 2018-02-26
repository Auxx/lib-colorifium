import { RGB8, RGBF, XYZ } from '../interfaces/color-models';
import { Matrix } from '../util/matrix';
import { XYZHelper } from '../util/helpers';
import { FromRGBF } from './rgbf';
import { Lab } from '../';
import { XYZRefs } from '../util/xyz-refs';

export class FromXYZ {
  /**
   * Converts XYZ object to RGBF.
   * @param {XYZ} xyz
   * @returns {RGBF}
   */
  static toRGBF(xyz: XYZ): RGBF;
  /**
   * Converts XYZ values to RGBF.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {RGBF}
   */
  static toRGBF(x: number, y: number, z: number): RGBF;
  static toRGBF(x: any, y?: number, z?: number): RGBF {
    const args = FromXYZ.resolveArguments(x, y, z);

    const result: RGBF = {
      r: args.x * Matrix.XYZtosRGB.x[ 0 ] + args.y * Matrix.XYZtosRGB.x[ 1 ] + args.z * Matrix.XYZtosRGB.x[ 2 ],
      g: args.x * Matrix.XYZtosRGB.y[ 0 ] + args.y * Matrix.XYZtosRGB.y[ 1 ] + args.z * Matrix.XYZtosRGB.y[ 2 ],
      b: args.x * Matrix.XYZtosRGB.z[ 0 ] + args.y * Matrix.XYZtosRGB.z[ 1 ] + args.z * Matrix.XYZtosRGB.z[ 2 ]
    };

    // RGBF values can not be bigger than 1 no matter which rounding errors we have
    result.r = Math.max(Math.min(XYZHelper.pivotXYZ(result.r), 1), 0);
    result.g = Math.max(Math.min(XYZHelper.pivotXYZ(result.g), 1), 0);
    result.b = Math.max(Math.min(XYZHelper.pivotXYZ(result.b), 1), 0);

    return result;
  }

  /**
   * Converts XYZ object to RGB8.
   * @param {XYZ} xyz
   * @returns {RGB8}
   */
  static toRGB8(xyz: XYZ): RGB8;
  /**
   * Converts XYZ values to RGB8.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {RGB8}
   */
  static toRGB8(x: number, y: number, z: number): RGB8;
  static toRGB8(x: any, y?: number, z?: number): RGB8 {
    return FromRGBF.toRGB8(FromXYZ.toRGBF(x, y, z));
  }

  /**
   * Converts XYZ object to Lab.
   * @param {XYZ} xyz
   * @returns {Lab}
   */
  static toLab(xyz: XYZ): Lab;
  /**
   * Converts XYZ values to RGB8.
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Lab}
   */
  static toLab(x: number, y: number, z: number): Lab;
  static toLab(x: any, y?: number, z?: number): Lab {
    // We assume D65 at 2deg illuminant here which corresponds to sRGB.
    const args = FromXYZ.rebase(FromXYZ.resolveArguments(x, y, z), XYZRefs.D65_2d);

    args.x = XYZHelper.pivotToLab(args.x);
    args.y = XYZHelper.pivotToLab(args.y);
    args.z = XYZHelper.pivotToLab(args.z);

    return {
      l: 116 * args.y - 16,
      a: 500 * (args.x - args.y),
      b: 200 * (args.y - args.z)
    };
  }

  private static rebase(xyz: XYZ, illuminant: XYZ): XYZ {
    const result: XYZ = {
      x: xyz.x / illuminant.x,
      y: xyz.y / illuminant.y,
      z: xyz.z / illuminant.z
    };

    if (result.x > 1) {
      result.x = 1;
    }

    if (result.y > 1) {
      result.y = 1;
    }

    if (result.z > 1) {
      result.z = 1;
    }

    return result;
  }

  private static resolveArguments(x: any, y?: number, z?: number): XYZ {
    const argumentType = typeof x;

    if (argumentType === 'object' && x !== null) {
      return { x: x.x, y: x.y, z: x.z };
    }

    if (argumentType === 'number') {
      return { x: x, y: y, z: z };
    }

    throw new TypeError('Unknown arguments passed');
  }
}
