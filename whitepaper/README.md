# Whitepaper source and reproduction

All files were prepared in the cloud checkout; no laptop filesystem is required.

- `whitepaper.tex`: complete editable LaTeX for the **revised** PDF.
- `whitepaper.md`: generated narrative incorporating the canonical current MDX references.
- `../public/whitepaper.pdf`: current published download, compiled from `whitepaper.tex`.
- `../public/whitepaper.tex`: identical source offered for download.

Only the current paper is published. Prior editions can be recovered from Git history and are not part of public assets, generated documentation, or the current PDF.

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

Keep the attached Persian specification as source evidence. Its reported deployments and proposed VRF/CCIP integration are not independent on-chain verification. Do not convert shortened addresses into operational configuration.
