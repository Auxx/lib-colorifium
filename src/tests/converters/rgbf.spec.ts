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
});
