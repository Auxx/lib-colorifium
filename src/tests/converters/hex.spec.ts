import { expect } from 'chai';
import 'mocha';

import { FromHex } from '../../main';

describe('FromHex', () => {
  it('should convert from hex to RGB8', () => {
    let result = FromHex.toRGB8('0080FF');
    expect(result.r).to.eq(0);
    expect(result.g).to.eq(128);
    expect(result.b).to.eq(255);

    result = FromHex.toRGB8('08F');
    expect(result.r).to.eq(0);
    expect(result.g).to.eq(136);
    expect(result.b).to.eq(255);
  });
});
