/**
 * Container for matrix transformation constants.
 */
export class Matrix {
  /**
   * sRGB to XYZ conversion matrix.
   * @type {{
   *   r: number[number, number, number];
   *   g: number[number, number, number];
   *   b: number[number, number, number]
   * }}
   */
  static readonly sRGBtoXYZ = {
    r: [ 0.4124564, 0.3575761, 0.1804375 ],
    g: [ 0.2126729, 0.7151522, 0.0721750 ],
    b: [ 0.0193339, 0.1191920, 0.9503041 ]
  };

  /**
   * XYZ to sRGB conversion matrix.
   * @type {{
   *   r: number[number, number, number];
   *   g: number[number, number, number];
   *   b: number[number, number, number]
   * }}
   */
  static readonly XYZtosRGB = {
    x: [ 3.2404542, -1.5371385, -0.4985314 ],
    y: [ -0.9692660, 1.8760108, 0.0415560 ],
    z: [ 0.0556434, -0.2040259, 1.0572252 ]
  };
}
