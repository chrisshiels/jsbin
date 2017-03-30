// 'test/cat.js'.
// Chris Shiels.


'use strict';


const assert = require('assert');

const cat = require('../cat');


describe('Cat', function() {
  describe('#constructor()', function() {
    it('returns an object', function() {
      assert.equal(typeof cat.Cat(), 'object');
    });
  });
});
