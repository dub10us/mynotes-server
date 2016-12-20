const assert = require('chai').assert;
const moment = require('moment');

describe('Create new access key', () => {
  it('Creates access key object with keys and expires dates set', () => {

    const createAccessKey = require('app/accessKey/createAccessKey')(10, 60);

    const now = moment();
    return createAccessKey(123).then((accessKey) => {
      assert.equal(
        accessKey.key.length,
        64,
        'Key should have 64 bytes of hex encoded bytes'
      );
      assert.equal(
        accessKey.refreshKey.length,
        64,
        'Refresh key should have 64 bytes of hex encoded bytes'
      );
      assert.notEqual(
        accessKey.key,
        accessKey.refreshKey,
        'Key and refreshKey should be different'
      );

      assert.equal(accessKey.userId, 123);

      let expectedExpiresAtFrom = now.clone().add(9, 'seconds');
      let expectedExpiresAtTo = now.clone().add(11, 'seconds');
      assert.isTrue(
        moment(accessKey.keyExpiresAt).isSameOrAfter(expectedExpiresAtFrom),
        'keyExpiresAt should be now + 10 seconds'
      );
      assert.isTrue(
        moment(accessKey.keyExpiresAt).isSameOrBefore(expectedExpiresAtTo),
        'keyExpiresAt should be now + 10 seconds'
      );

      expectedExpiresAtFrom = now.clone().add(59, 'seconds');
      expectedExpiresAtTo = now.clone().add(61, 'seconds');
      assert.isTrue(
        moment(accessKey.refreshKeyExpiresAt).isSameOrAfter(expectedExpiresAtFrom),
        'refreshKeyExpiresAt should be now + 60 seconds'
      );
      assert.isTrue(
        moment(accessKey.refreshKeyExpiresAt).isSameOrBefore(expectedExpiresAtTo),
        'refreshKeyExpiresAt should be now + 60 seconds'
      );
    });
  });
});
