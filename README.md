[![Build Status](https://travis-ci.org/tstibbs/os-map.svg?branch=master)](https://travis-ci.org/tstibbs/os-map)
[![Coverage Status](https://coveralls.io/repos/github/tstibbs/os-map/badge.svg?branch=master)](https://coveralls.io/github/tstibbs/os-map?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/tstibbs/os-map.svg)](https://github.com/tstibbs/os-map/issues)
[![bitHound Overall Score](https://www.bithound.io/github/tstibbs/os-map/badges/score.svg)](https://www.bithound.io/github/tstibbs/os-map)
[![GitHub license](https://img.shields.io/badge/license-Apache%202-blue.svg)](https://raw.githubusercontent.com/tstibbs/os-map/master/LICENSE)

## What is this
OS OpenSpace doesn't have the 1:25,000 mapping and the embeddable Bing client is a bit rubbish. So I thought I'd hook together some pre-existing stuff to make something a bit more appropriate for walking maps that isn't as rubbish as the bing client but still has the 1:25,000 mapping. It's mostly just me experimenting, there will be no technological breakthroughs here.

## Why does it use require.js
Because I wanted to learn about require. The page load time seems to increase significantly with require, so I'd probably remove it if wanted to use this code for something in production.

## How can I try it
[Live demo](http://tstibbs.github.io/os-map/)

## Unit tests
There are some basic unit tests covering some of the non-UI functionality. To run these:
```
npm install
npm test
```
