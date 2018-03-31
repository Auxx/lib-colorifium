import { expect } from 'chai';
import 'mocha';

import { FromHSV } from '../../main';

describe('FromHSV', () => {
  it('should convert from HSV to RGBF', () => {
    let result = FromHSV.toRGBF(22.5, 0.8, 1);
    expect(result.r).to.eq(1);
    expect(result.g).to.eq(0.5);
    expect(result.b).to.be.within(0.19, 0.2);

    result = FromHSV.toRGBF({ h: 22.5, s: 0.8, v: 1 });
    expect(result.r).to.eq(1);
    expect(result.g).to.eq(0.5);
    expect(result.b).to.be.within(0.19, 0.2);
  });

  it('should convert from HSV to RGB8', () => {
    const result = FromHSV.toRGB8(22.5, 0.8, 1);
    expect(result.r).to.eq(255);
    expect(result.g).to.eq(128);
    expect(result.b).to.eq(51);
  });
});
