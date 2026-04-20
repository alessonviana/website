#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

cp index.html dist/
cp -R css fonts img js dist/
find dist -name '.DS_Store' -delete

# Render returned 404 for a couple of historical CSS filenames while serving
# other assets from the same folder. Publish stable aliases and point the built
# HTML at them.
cp dist/css/kube.min.css dist/css/base.css
cp dist/css/custom.min.css dist/css/theme.css
sed -i \
  -e 's|href="css/kube.min.css"|href="css/base.css"|' \
  -e 's|href="css/custom.min.css"|href="css/theme.css"|' \
  dist/index.html

echo "Static site built in dist/"
