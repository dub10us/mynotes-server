'use strict';

const assert = require('chai').assert;
const moment = require('moment');

describe('Refresh expired access key', () => {
  it('Throws exception on invalid key', () => {
    const refreshAccessKey = require('app/accessKey/refreshAccessKey')(10);

    assert.throws(() => {
      refreshAccessKey({});
    }, 'Invalid key');

    assert.throws(() => {
      refreshAccessKey({
        key: '34345345345'
      });
    }, 'Invalid key');
  });

  it('Throws exception on not expired key', () => {
    const refreshAccessKey = require('app/accessKey/refreshAccessKey')(10);

    assert.throws(() => {
      // a key still valid for one second
      refreshAccessKey({
        userId: 77,
        key: '34345345345',
        keyExpiresAt: moment().add('1', 'second').format(),
        refreshKey: '56565656',
        refreshKeyExpiresAt: moment().add('1', 'second').format()
      });
    }, 'The key is not expired, so does not need to be refreshed');
  });

  it('Throws exception on expired refresh key', () => {
    const refreshAccessKey = require('app/accessKey/refreshAccessKey')(10);

    assert.throws(() => {
      // a refres key not valid anymore since one second
      refreshAccessKey({
        userId: 77,
        key: '34345345345',
        keyExpiresAt: moment().subtract('2', 'second').format(),
        refreshKey: '56565656',
        refreshKeyExpiresAt: moment().subtract('1', 'second').format()
      });
    }, 'The refreshKey is expired');
  });

  it('Creates new access key with same userId and *same* refresh key expiration time', () => {
    const refreshAccessKey = require('app/accessKey/refreshAccessKey')(10);

    const refreshKeyExpiresAt = moment().add(1, 'hour').format();
    const now = moment();
    return refreshAccessKey({
      userId: 77,
      key: 'old key',
      keyExpiresAt: moment().subtract('1', 'second').format(),
      refreshKey: 'old refresh key',
      refreshKeyExpiresAt: refreshKeyExpiresAt
    }).then(newKey => {
      assert.equal(newKey.userId, 77);

      assert.notEqual(newKey.key, 'old key');
      assert.notEqual(newKey.refreshKey, 'old refresh key');
      assert.equal(newKey.key.length, 64);
      assert.equal(newKey.refreshKey.length, 64);

      assert.equal(newKey.refreshKeyExpiresAt, refreshKeyExpiresAt);

      let expectedExpiresAtFrom = now.clone().add(9, 'seconds');
      let expectedExpiresAtTo = now.clone().add(11, 'seconds');
      assert.isTrue(
        moment(newKey.keyExpiresAt).isSameOrAfter(expectedExpiresAtFrom),
        'keyExpiresAt should be now + 10 seconds'
      );
      assert.isTrue(
        moment(newKey.keyExpiresAt).isSameOrBefore(expectedExpiresAtTo),
        'keyExpiresAt should be now + 10 seconds'
      );
    });
  });
});
