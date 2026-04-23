#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

cp index.html dist/
cp styles.css dist/
cp style.css dist/
cp asmr-background.js dist/
cp hero-animations.js dist/
cp page-progress.js dist/
cp script.js dist/
cp -R css docs fonts img js dist/
find dist -name '.DS_Store' -delete

echo "Static site built in dist/"
