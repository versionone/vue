#!/usr/bin/env bash

set -e

export PATH="`yarn bin`:$PATH"

start-storybook -p 9001 -c build/storybook
chalk --no-stdin -t "{blue Visit http://localhost:9001}"
