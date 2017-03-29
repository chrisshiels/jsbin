#!/usr/bin/env node

// 'echo.js'.
// Chris Shiels.


'use strict';


const ExitSuccess = 0;
const ExitFailure = 1;


const Echo = function() {
  let stdin;
  let stdout;
  let stderr;

  const echo = function(argv) {
    stdout.write(argv.slice(1).join(' ') + '\n');
    return ExitSuccess;
  }

  const main = function(_stdin, _stdout, _stderr, argv) {
    stdin = _stdin;
    stdout = _stdout;
    stderr = _stderr;

    return echo(argv);
  }

  return {
    echo: echo,
    main: main
  }
}


if (!module.parent)
  process.exitCode = Echo().main(process.stdin,
                                 process.stdout,
                                 process.stderr,
	                         process.argv.slice(1));
else
  module.exports = {
    Echo: Echo,
    ExitSuccess: ExitSuccess,
    ExitFailure: ExitFailure
  };
