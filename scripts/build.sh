#!/bin/bash

project=wordgame

if [ -d dist/wp-content ]; then
	base_path=dist/wp-content/themes/${project}
else
	base_path=dist
fi

echo "<?php define('ASSETS_VERSION', '`date '+%Y%m%d%H%M%S'`');" > ./dist/assets-version.php
rm -rf ./${base_path}/assets/built
if [ $(uname) = "Linux" ]; then
	sudo n 16
else
	n 16
fi
npm install
webpack --config webpack.prod.config.js --env base_path="${base_path}"
