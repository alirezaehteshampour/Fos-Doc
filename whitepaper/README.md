# Whitepaper source and reproduction

All files were prepared in the cloud checkout; no laptop filesystem is required.

- `whitepaper.tex`: complete editable LaTeX for the **revised** PDF.
- `whitepaper.md`: generated narrative incorporating the canonical current MDX references.
- `../public/whitepaper.pdf`: current published download, compiled from `whitepaper.tex`.
- `../public/whitepaper.tex`: identical source offered for download.
- `../public/archive/whitepaper-2025.pdf`: original ten-page PDF, preserved byte-for-byte.
- `original-facsimile.tex`: exact visual page reproduction using `pdfpages`. It embeds the preserved PDF; it is **not** the recovered original editable source.

The exact original LaTeX cannot be recovered from a PDF alone. The revised paper is editable and covers the new contract rules; its pagination and layout are newly typeset. No claim is made that editable reconstruction recovers the original source or that the revised paper should be visually identical to a document with obsolete content.

From the repository root, run:

```bash
bash scripts/build-whitepaper.sh
```

Prerequisites: Python 3, Pandoc, XeLaTeX, the standard packages referenced by the standalone source, and DejaVu Serif/Sans Mono fonts. The cloud environment includes these tools. The script regenerates the AI reference and consolidated docs from current MDX before compiling. No API key or external font download is needed.

To compile the revised source alone, without regeneration:

```bash
cd whitepaper
xelatex -interaction=nonstopmode -halt-on-error -no-shell-escape whitepaper.tex
xelatex -interaction=nonstopmode -halt-on-error -no-shell-escape whitepaper.tex
xelatex -interaction=nonstopmode -halt-on-error -no-shell-escape whitepaper.tex
```

For the historical facsimile, run `pdflatex -interaction=nonstopmode -halt-on-error -no-shell-escape original-facsimile.tex` from `whitepaper`. Validate pixel-level equality against the original; metadata/file hashes of the wrapper output can differ, while the preserved original PDF is byte-identical.

Keep the attached Persian specification as source evidence. Its reported deployments and proposed VRF/CCIP integration are not independent on-chain verification. Do not convert shortened addresses into operational configuration.
