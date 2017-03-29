// 'test/echo.js'.
// Chris Shiels.


'use strict';


const assert = require('assert');
const stream = require('stream');

const echo = require('../echo');
const stringwritable = require('./lib/stringwritable.js');


describe('Echo', function() {
  describe('#constructor()', function() {
    it('returns an object', function() {
      assert.equal(typeof echo.Echo(), 'object');
    });
  });

  describe('#main()', function() {
    it('handles zero arguments', function() {
      let stringwritableout = stringwritable.StringWritable();
      let ret = echo.Echo().main(undefined,
                                 stringwritableout,
                                 undefined,
                                 [ 'echo.js' ])
      assert.equal(stringwritableout.string(), '\n');
      assert.equal(ret, echo.ExitSuccess);
    });

    it('handles one arguments', function() {
      let stringwritableout = stringwritable.StringWritable();
      let ret = echo.Echo().main(undefined,
                                 stringwritableout,
                                 undefined,
                                 [ 'echo.js', 'a' ])
      assert.equal(stringwritableout.string(), 'a\n');
      assert.equal(ret, echo.ExitSuccess);
    });

    it('handles many arguments', function() {
      let stringwritableout = stringwritable.StringWritable();
      let ret = echo.Echo().main(undefined,
                                 stringwritableout,
                                 undefined,
                                 [ 'echo.js', 'a', 'b', 'c' ])
      assert.equal(stringwritableout.string(), 'a b c\n');
      assert.equal(ret, echo.ExitSuccess);
    });
  });
});
