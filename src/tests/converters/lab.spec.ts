import { expect } from 'chai';
import 'mocha';

import { FromLab } from '../../main/converters/lab';

describe('FromLab', () => {
  it('should convert from Lab to XYZ', () => {
    let result = FromLab.toXYZ(100, 0, 0);
    expect(result.x).to.eq(0.95047, 'XYZ.x');
    expect(result.y).to.eq(1, 'XYZ.y');
    expect(result.z).to.eq(1.08883, 'XYZ.z');

    result = FromLab.toXYZ(53.2407, 80.0924, 67.2031);
    expect(result.x).to.be.within(0.4124, 0.4125, 'XYZ.x');
    expect(result.y).to.be.within(0.2126, 0.2127, 'XYZ.y');
    expect(result.z).to.be.within(0.0193, 0.0194, 'XYZ.z');
  });

  it('should convert from Lab to RGBF', () => {
    let result = FromLab.toRGBF(100, 0, 0);
    expect(result.r).to.be.within(0.9999, 1, 'RGBF.r');
    expect(result.g).to.be.within(0.9999, 1, 'RGBF.g');
    expect(result.b).to.be.within(0.9999, 1, 'RGBF.b');

    result = FromLab.toRGBF(53.2407, 80.0924, 67.2031);
    expect(result.r).to.be.within(0.9999, 1, 'RGBF.r');
    expect(result.g).to.be.within(0, 0.0001, 'RGBF.g');
    expect(result.b).to.be.within(0, 0.0001, 'RGBF.b');
  });

  it('should convert from Lab to RGB8', () => {
    let result = FromLab.toRGB8(100, 0, 0);
    expect(result.r).to.eq(255, 'RGB8.r');
    expect(result.g).to.eq(255, 'RGB8.g');
    expect(result.b).to.eq(255, 'RGB8.b');

    result = FromLab.toRGB8(53.2407, 80.0924, 67.2031);
    expect(result.r).to.eq(255, 'RGB8.r');
    expect(result.g).to.eq(0, 'RGB8.g');
    expect(result.b).to.eq(0, 'RGB8.b');
  });
});
