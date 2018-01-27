import { RGBF } from '../interfaces/color-models';

export class HueHelper {
  static calculateBasisFromRGBF(rgb: RGBF): HueBasis {
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const delta = max - min;

    let hue;

    switch (max) {
      case 0:
        hue = 0;
        break;
      case rgb.r:
        hue = (rgb.g - rgb.b) / delta + (rgb.g < rgb.b ? 6 : 0);
        break;
      case rgb.g:
        hue = (rgb.b - rgb.r) / delta + 2;
        break;
      case rgb.b:
        hue = (rgb.r - rgb.g) / delta + 4;
        break;
    }

    return {
      min: min,
      max: max,
      delta: delta,
      hue: hue * 60
    };
  }

  static hueToRgbMatrix(a: number, b: number, c: number, m: number): RGBF {
    return {
      r: a + m,
      g: b + m,
      b: c + m
    };
  }
}

export class HexHelper {
  static numberToHex(value: number): string {
    const result = value.toString(16).toUpperCase();
    return result.length % 2 === 0 ? result : `0${result}`;
  }
}

export class XYZHelper {
  static pivotRGB(v: number): number {
    return (v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92) * 100;
  }
}

export interface HueBasis {
  min: number;
  max: number;
  delta: number;
  hue: number;
}
