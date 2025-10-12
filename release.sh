#!/usr/bin/env bash

npm run deploy-build

mv ./docs/browser/* ./docs/
rm -Rf ./docs/browser/
cp ./docs/index.html ./docs/404.html
