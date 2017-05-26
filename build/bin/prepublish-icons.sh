#!/usr/bin/env bash
set -e

pushd ../.. > /dev/null
export PATH="`yarn bin`:$PATH"
popd > /dev/null

chalk --no-stdin -t "{blue Generating icons...}"
node packages/v1-icon-builder/src/build.js --svgDir=packages/v1-icons/src --outputDir=packages/Icons/src
