#!/bin/bash

project=wordgame
base_path=dist
npm install
webpack --config webpack.prod.config.js --env base_path="${base_path}"
