#!/usr/bin/env node

// 'cat.js'.
// Chris Shiels.


'use strict';


const fs = require('fs');


const ExitSuccess = 0;
const ExitFailure = 1;

const StdinFileno = 0;
const StdoutFileno = 1;
const StderrFileno = 2;

const BufLen = 65536;


const Cat = function() {
  let stdin;
  let stdout;
  let stderr;

  const cat = function(fdin, fdout, buflen) {
    let buf = Buffer.alloc(buflen);
    while (true) {
      // Note fs.readSync() returns 0 at end of file.
      let nread = fs.readSync(fdin,
                              buf,
                              0,
                              buflen,
                              null);
      if (nread == 0) break;

      // Note fs.writeSync() may write fewer bytes than requested.
      let nwritten = 0;
      while (nwritten != nread)
        try {
          nwritten += fs.writeSync(fdout,
                                   buf,
                                   nwritten,
                                   nread - nwritten,
                                   null);
        } catch (e) {
          if (e.code != 'EAGAIN')
            throw e;
        }
        // else loop and attempt to write remaining bytes.
    }
    return ExitSuccess;
  };

  const main = function(_stdin, _stdout, _stderr, argv) {
    stdin = _stdin;
    stdout = _stdout;
    stderr = _stderr;

    try {
      argv.shift();
      if (argv.length == 0)
        cat(stdin.fd, stdout.fd, BufLen);
      else
        argv.forEach(function (e) {
          let fd = fs.openSync(e, 'r');
          cat(fd, stdout.fd, BufLen);
          fs.closeSync(fd);
        });

      return ExitSuccess;
    } catch (e) {
      stderr.write('cat: ' + e.message + '\n');
      return ExitFailure;
    }
  }

  return {
    cat: cat,
    main: main
  };
}


if (!module.parent) {
  // Note process.stdin is non-blocking.
  process.exitCode = Cat().main(fs.createReadStream('', { fd: StdinFileno }),
                                process.stdout,
                                process.stderr,
	                        process.argv.slice(1));
} else
  module.exports = {
    Cat: Cat,
    ExitSuccess: ExitSuccess,
    ExitFailure: ExitFailure
  };
