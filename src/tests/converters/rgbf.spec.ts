import { expect } from 'chai';
import 'mocha';

import { FromRGBF } from '../../main';

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

  it('should convert from RGBF to HSV', () => {
    const result = FromRGBF.toHSV(1, 0.5, 0.2);
    expect(result.h).to.be.within(22.49, 22.5);
    expect(result.s).to.eq(0.8);
    expect(result.v).to.eq(1);
  });

  it('should convert from RGBF to XYZ', () => {
    const result = FromRGBF.toXYZ(1, 0.5, 0.2);
    expect(result.x).to.be.within(0.49496, 0.49497);
    expect(result.y).to.be.within(0.36813, 0.36814);
    expect(result.z).to.be.within(0.076305, 0.076306);
  });

  it('should convert from RGBF to Lab', () => {
    let result = FromRGBF.toLab(1, 1, 1);
    expect(result.l).to.eq(100, 'Lab.L');
    expect(result.a).to.eq(0, 'Lab.a');
    expect(result.b).to.eq(0, 'Lab.b');

    result = FromRGBF.toLab(1, 0, 0);
    expect(result.l).to.be.within(53.2407, 53.2408, 'Lab.L');
    expect(result.a).to.be.within(80.0924, 80.0925, 'Lab.a');
    expect(result.b).to.be.within(67.2031, 67.2032, 'Lab.b');
  });
});
