import { expect } from 'chai';
import 'mocha';

import { FromRGBF } from '../../main/converters/rgbf';

describe('FromRGBF', () => {
  it('should convert from RGB float values to RGB8', () => {
    let result = FromRGBF.toRGB8(1, 0.22, 0.358);
    expect(result.r).to.eq(255);
    expect(result.g).to.eq(56);
    expect(result.b).to.eq(91);

    result = FromRGBF.toRGB8(0, 0.5, 0.75);
    expect(result.r).to.eq(0);
    expect(result.g).to.eq(128);
    expect(result.b).to.eq(191);
  });

  it('should convert from RGBF to RGB8', () => {
    let result = FromRGBF.toRGB8({ r: 1, g: 0.22, b: 0.358 });
    expect(result.r).to.eq(255);
    expect(result.g).to.eq(56);
    expect(result.b).to.eq(91);

    result = FromRGBF.toRGB8({ r: 0, g: 0.5, b: 0.75 });
    expect(result.r).to.eq(0);
    expect(result.g).to.eq(128);
    expect(result.b).to.eq(191);
  });

  it('should convert from RGBF to HSL', () => {
    let result = FromRGBF.toHSL(1, 0.5, 0.2);
    expect(result.h).to.be.within(22.49, 22.5);
    expect(result.s).to.eq(1);
    expect(result.l).to.be.within(0.6, 0.601);

    result = FromRGBF.toHSL(0.2, 0.65, 0.9);
    expect(result.h).to.be.within(201.4, 201.5);
    expect(result.s).to.be.within(0.77, 0.78);
    expect(result.l).to.be.within(0.54, 0.56);
  });
});
