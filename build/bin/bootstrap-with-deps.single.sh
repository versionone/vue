#!/usr/bin/env bash
set -e

BASEDIR=$(dirname $0)
$BASEDIR/bootstrap.single.sh "$1" --include-filtered-dependencies
