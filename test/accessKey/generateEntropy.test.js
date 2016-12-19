const assert = require('chai').assert;
const generateEntropy = require('app/accessKey/generateEntropy');

describe('Generate entropy', function() {
  it('Generates string of random bytes as a Buffer', function() {
    return generateEntropy(20).then(buf => {
      assert.equal(Buffer.byteLength(buf), 20, 'Buffer should have length of 20 bytes');
    })
  });
});
