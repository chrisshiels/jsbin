// 'test/lib/stringwritable.js'.
// Chris Shiels.


'use strict';


const StringWritable = function() {
  let chunks = [];

  const write = function(chunk) {
    chunks.push(chunk);
  }

  const string = function() {
    return chunks.join('');
  }

  return {
    write: write,
    string: string
  };
}


module.exports = {
  StringWritable: StringWritable
}
