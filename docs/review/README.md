# Review the updated FOS documentation

These are browser captures from the tested cloud production build, refreshed October 12, 2026 after restoring the original FOS product terminology. They show the implementation for review; they are not an interactive hosted preview or proof of a completed live deployment.

## Whitepaper downloads

- [Current PDF](https://raw.githubusercontent.com/alirezaehteshampour/Fos-Doc/main/public/whitepaper.pdf)
- [Editable LaTeX](https://raw.githubusercontent.com/alirezaehteshampour/Fos-Doc/main/public/whitepaper.tex)
- [View PDF on GitHub](../../public/whitepaper.pdf)

The PDF and LaTeX are committed alongside the site. GitHub links require the same repository access as the code; an inaccessible repository/file may return 404. The source reproduces the revised PDF byte-for-byte; the unchanged original and embedding-based historical facsimile are described in [whitepaper provenance](../../whitepaper/README.md).

## Verified behavior

Production build, TypeScript, lint, documentation consistency, all 61 documentation routes plus five application pages, search, chart rendering, FAQ expansion, and whitepaper assets passed checks. The desktop and mobile homepage, referral page, and whitepaper page rendered without client errors; the mobile checks found no horizontal page overflow.

Real AI answers still require `GEMINI_API_KEY` in the hosting environment. Hosting deployment has not been confirmed. No laptop filesystem or local installation was used.

## Desktop homepage

![Updated desktop homepage](homepage.png)

## Referral documentation

![Three-plan referral documentation](referral.png)

## Mobile homepage

![Updated mobile homepage](mobile-homepage.png)

## Whitepaper cover and contents

![Revised whitepaper cover](whitepaper-cover.png)
