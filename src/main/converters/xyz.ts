import { RGB8, RGBF, XYZ } from '../interfaces/color-models';
import { Matrix } from '../util/matrix';
import { XYZHelper } from '../util/helpers';
import { FromRGBF } from './rgbf';

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

    result.r = XYZHelper.pivotXYZ(result.r);
    result.g = XYZHelper.pivotXYZ(result.g);
    result.b = XYZHelper.pivotXYZ(result.b);

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

  private static resolveArguments(x: any, y?: number, z?: number): XYZ {
    const argumentType = typeof x;
    let result: XYZ;

    if (argumentType === 'object' && x !== null) {
      result = { x: x.x, y: x.y, z: x.z };
    } else if (argumentType === 'number') {
      result = { x: x, y: y, z: z };
    } else {
      throw new TypeError('Unknown arguments passed');
    }

    return result;
  }
}
