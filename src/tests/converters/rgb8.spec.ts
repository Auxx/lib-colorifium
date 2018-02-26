import { expect } from 'chai';
import 'mocha';

import { FromRGB8 } from '../../main/converters/rgb8';

describe('FromRGB8', () => {
  it('should convert from RGB 8 bit values to RGBF', () => {
    let result = FromRGB8.toRGBF(0, 53, 128);
    expect(result.r).to.eq(0);
    expect(result.g).to.be.within(0.20784, 0.20785);
    expect(result.b).to.be.within(0.50196, 0.50197);

    result = FromRGB8.toRGBF(255, 92, 244);
    expect(result.r).to.eq(1);
    expect(result.g).to.be.within(0.36078, 0.36079);
    expect(result.b).to.be.within(0.95686, 0.95687);
  });

  it('should convert from RGB8 to HSL', () => {
    const result = FromRGB8.toHSL(64, 133, 211);
    expect(result.h).to.be.within(211.8, 211.9);
    expect(result.s).to.be.within(0.62, 0.63);
    expect(result.l).to.be.within(0.53, 0.54);
  });

  it('should convert from RGB8 to HSV', () => {
    const result = FromRGB8.toHSV(255, 128, 51);
    expect(result.h).to.be.within(22.64, 22.65);
    expect(result.s).to.eq(0.8);
    expect(result.v).to.eq(1);
  });

  it('should convert from RGB8 to hex', () => {
    const result = FromRGB8.toHex(255, 80, 45);
    expect(result).to.eq('FF502D');
  });

  it('should convert from RGB8 to CSS RGB', () => {
    const result = FromRGB8.toCssRgb(255, 80, 45);
    expect(result).to.eq('rgb(255, 80, 45)');
  });

  it('should convert from RGB8 to CSS RGBA', () => {
    const result = FromRGB8.toCssRgba(255, 80, 45, 128);
    expect(result).to.eq('rgba(255, 80, 45, 0.50)');
  });

  it('should convert from RGB8 to RGBA hex', () => {
    let result = FromRGB8.toRGBAHex(255, 80, 45, 255);
    expect(result).to.eq('FF502DFF');

    result = FromRGB8.toRGBAHex(255, 80, 45, 128);
    expect(result).to.eq('FF502D80');

    result = FromRGB8.toRGBAHex({ r: 255, g: 80, b: 45 }, 128);
    expect(result).to.eq('FF502D80');
  });

  it('should convert from RGB8 to ARGB hex', () => {
    let result = FromRGB8.toARGBHex(255, 80, 45, 255);
    expect(result).to.eq('FFFF502D');

    result = FromRGB8.toARGBHex(255, 80, 45, 128);
    expect(result).to.eq('80FF502D');

    result = FromRGB8.toARGBHex({ r: 255, g: 80, b: 45 }, 128);
    expect(result).to.eq('80FF502D');
  });

  it('should convert from RGB8 to XYZ', () => {
    const result = FromRGB8.toXYZ(255, 128, 51);
    expect(result.x).to.be.within(0.49561, 0.49562);
    expect(result.y).to.be.within(0.36943, 0.36944);
    expect(result.z).to.be.within(0.076522, 0.076523);
  });

  it('should convert from RGB8 to Lab', () => {
    let result = FromRGB8.toLab(255, 255, 255);
    expect(result.l).to.eq(100, 'Lab.L');
    expect(result.a).to.eq(0, 'Lab.a');
    expect(result.b).to.eq(0, 'Lab.b');

    result = FromRGB8.toLab(255, 0, 0);
    expect(result.l).to.be.within(53.2407, 53.2408, 'Lab.L');
    expect(result.a).to.be.within(80.0924, 80.0925, 'Lab.a');
    expect(result.b).to.be.within(67.2031, 67.2032, 'Lab.b');
  });
});
