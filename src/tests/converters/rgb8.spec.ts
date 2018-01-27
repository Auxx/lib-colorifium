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

  it('should convert from RGB8 to XYZ', () => {
    const result = FromRGB8.toXYZ(255, 128, 51);
    expect(result.x).to.be.within(49.561, 49.562);
    expect(result.y).to.be.within(36.943, 36.944);
    expect(result.z).to.be.within(7.6522, 7.6523);
  });
});
