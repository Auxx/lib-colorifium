import { expect } from 'chai';
import 'mocha';
import { FromHSL } from '../../main/converters/hsl';

describe('FromHSL', () => {
  it('should convert from HSL to RGBF', () => {
    let result = FromHSL.toRGBF(22.5, 1, 0.6);
    expect(result.r).to.eq(1);
    expect(result.g).to.eq(0.5);
    expect(result.b).to.be.within(0.19, 0.2);

    result = FromHSL.toRGBF({ h: 200, s: 0.8, l: 0.55 });
    expect(result.r).to.be.within(0.190, 0.191);
    expect(result.g).to.be.within(0.669, 0.670);
    expect(result.b).to.be.within(0.910, 0.911);
  });
});
