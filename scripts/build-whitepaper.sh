#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
python3 scripts/generate-doc-artifacts.py
cd whitepaper
# Stable metadata for this dated edition; repeated builds are reproducible.
export SOURCE_DATE_EPOCH=1792454400
export FORCE_SOURCE_DATE=1
for pass in 1 2 3; do
  xelatex -interaction=nonstopmode -halt-on-error -no-shell-escape whitepaper.tex > /tmp/fos-whitepaper-build.log 2>&1 || {
    cat /tmp/fos-whitepaper-build.log
    exit 1
  }
done
cp whitepaper.pdf ../public/whitepaper.pdf
echo "Built public/whitepaper.pdf from whitepaper/whitepaper.tex"
