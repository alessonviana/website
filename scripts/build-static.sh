#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

cp index.html dist/
cp -R css fonts img js dist/
find dist -name '.DS_Store' -delete

echo "Static site built in dist/"
