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
});
