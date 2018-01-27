import { expect } from 'chai';
import 'mocha';

import { FromXYZ } from '../../main/converters/xyz';

describe('FromXYZ', () => {
  it('should convert from XYZ to RGBF', () => {
    let result = FromXYZ.toRGBF(0.49, 0.36, 0.07);
    expect(result.r).to.be.within(0.999, 1, 'rgb.R');
    expect(result.g).to.be.within(0.488, 0.489, 'rgb.G');
    expect(result.b).to.be.within(0.182, 0.183, 'rgb.B');

    result = FromXYZ.toRGBF({ x: 0.49, y: 0.36, z: 0.07 });
    expect(result.r).to.be.within(0.999, 1, 'rgb.R');
    expect(result.g).to.be.within(0.488, 0.489, 'rgb.G');
    expect(result.b).to.be.within(0.182, 0.183, 'rgb.B');
  });

  it('should convert from HSL to RGB8', () => {
    const result = FromXYZ.toRGB8(0.49, 0.36, 0.07);
    expect(result.r).to.eq(255, 'rgb.R');
    expect(result.g).to.eq(125, 'rgb.G');
    expect(result.b).to.eq(46, 'rgb.B');
  });
});
