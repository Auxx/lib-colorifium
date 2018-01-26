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
}

export interface HueBasis {
  min: number;
  max: number;
  delta: number;
  hue: number;
}
