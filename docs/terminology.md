# FOS product terminology

The product-language convention comes from the repository state before the Robinhood update: commit `fffadfefd38eea1bb3b39cfaeabd77f89c7f9bf5`, particularly `content/docs/protocol/legal.mdx` and `src/app/api/chat/route.ts`.

Use **Fos Digital Collectible**, **promotional distribution**, **recipient**, **allocation**, **loyalty reward**, and **cycle** when describing FOS. Describe mint-record eligibility, selection weights, probabilistic outcomes, fee accounting, and asynchronous settlement accurately using that vocabulary.

Avoid introducing lottery/gambling/iGaming terminology, tickets, winners, prizes, jackpots, or payouts as FOS product labels. Existing legal-policy exclusions and historical research comparisons may quote such terms in their original context. Historical documents and the supplied contract notes are source evidence and are not silently rewritten.

Preserve actual contract names and identifiers such as `lotteryType`, `ORIGIN_LOTTERY`, and `prizeShare` when needed for integration. These are technical identifiers from the supplied specification; they are not product naming or a legal classification. Public explanatory calls may label the type argument `collectionType`, which does not change the function selector.

This convention does not change the monetary parameters or contract mechanics and is not a legal determination or a licensing exemption. Use qualified advice for jurisdiction-specific legal questions.

Run `npm run docs:check` after edits. It checks current prose for newly introduced restricted vocabulary, verifies current artifacts, and preserves the original archived PDF. Regenerate the AI reference and the whitepaper with `npm run whitepaper:build`.
