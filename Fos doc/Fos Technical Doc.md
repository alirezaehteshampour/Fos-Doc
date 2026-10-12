<!-- Generated from current content/docs by scripts/generate-doc-artifacts.py. -->

# Technical Documentation

**Revision:** Robinhood / three-plan referral specification, October 2026.

## Repository boundary

This repository is the Next.js/Fumadocs documentation website. It implements documentation pages, a static search index, and a Gemini-powered chat route. It does not contain the project Solidity contracts, PHP main application, a verified ABI bundle, or deployment manifests for the described cross-chain integration.

The contract reference follows the supplied project specification. It distinguishes stated behavior from integration requirements and features carried forward as plans. Public contract addresses are omitted until their complete values and deployment versions are verified; do not use shortened addresses as configuration.

## System

FOSNFT, Processor, Referral, and Verify are user-facing components on Robinhood Chain. The specified randomness design requests Chainlink VRF on Base using CCIP messaging. Authentication of cross-chain responses, supported lanes, fee funding, and deployed callback interfaces require verification against the final code.

## References

| Section | Scope |
| :--- | :--- |
| [Smart Contracts](/docs/technical/smart-contracts) | Component boundaries and target parameters |
| [FOSNFT & Processor](/docs/technical/allocation-contract) | Mint, reserve, cycle, weighting, and payment rules |
| [Referral](/docs/technical/referral-contract) | Actual specified function names and plan math |
| [Verify](/docs/technical/verification-contract) | Certificate issuance, roles, and revocation |
| [Free Mint](/docs/technical/free-mint-contract) | Confirmed cycle freebies versus planned Genesis campaign |
| [Campaign](/docs/technical/campaign-contract) | Carried-forward campaign design and funding constraints |
| [Application](/docs/technical/application) | Wallet and state integration requirements |
| [Security](/docs/technical/security) | Risks and required implementation checks |
| [APIs](/docs/technical/apis) | Implemented docs routes and main-app integration models |
| [Network information](/docs/protocol/platform) | Mainnet/testnet IDs and registry references |

## Documentation-site workflow

Use Node.js >=20.9 and the committed lockfile: `npm ci`, `npx fumadocs-mdx`, `npm run dev`. Validate with `npx tsc --noEmit` and `npm run build`. Inter is vendored with its license, so the production build needs no Google Fonts download. `GEMINI_API_KEY` enables real AI responses; without it, chat returns an explicit configuration error. Set credentials securely in the cloud/deployment environment, never in source control.

# Smart Contracts

## Contract suite

| Contract | Responsibility | Specified network |
| :--- | :--- | :--- |
| `FOSNFT` | NFT mint, purchase payment, admin balance, free-collectible reserve | Robinhood |
| `Processor` | Authorized collectible registration, cycle state, selection, allocations | Robinhood |
| `Referral` | Registration, plans, upgrades, and direct-referral payments | Robinhood |
| `Verify` | Separate ERC-721 certificates, origin registry, validity status | Robinhood |
| VRF/CCIP integration | Carry cycle requests to Base and return VRF results | Robinhood and Base |

Only FOSNFT may register collectible mint records in Processor. Referral is independent of both contracts. Verify is optional and may be connected to FOSNFT and Referral; Processor has no direct Verify connection in the supplied structure.

## Three independent collection types

| Collection | Type ID | Nominal price | Admin fee | Admin per paid mint | Pool contribution per collectible | Full 500-collectible pool |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Buddy | 3 | $3 | 5% | $0.15 | $2.85 | $1,425 |
| Samurai | 13 | $13 | 3% | $0.39 | $12.61 | $6,305 |
| Noble | 25 | $25 | 2% | $0.50 | $24.50 | $12,250 |

Dollar amounts describe the product model, not a dollar-denominated contract balance or guaranteed allocation. Payments and allocations use native ETH. Read the configured on-chain price before sending a transaction; the production USD-to-ETH conversion policy is not supplied in the contract specification.

All three target 500 collectibles, with 17 selected collectibles and 50/30/20 group allocation. There is no specified 100-cycle lifetime cap. Only the initial weights and price labels are described here; per-cycle stored settings and current on-chain prices control execution.

## Standards and authority

NFT/certificate documentation uses ERC-721. Do not infer ERC-721A, ERC-1155, UUPS upgradeability, timelocks, or audit status from older drafts. Referral owner controls include prices, split basis points, admin wallet, and Verify connection. Verify owner controls include approved minters, origin types, URI configuration, admin wallet, and revocation.

## Deployment status

Robinhood Chain ID **4663** is reported by the supplied specification and corroborated by the public network registry. The specification provides incomplete addresses for some components and does not supply the final Base-side bridge deployment. Accordingly this reference does not publish operational FOS contract addresses, ABIs, RPC credentials, or callback selectors. The named functions in individual pages are specification references, not a replacement for a verified ABI.

Genesis allowlist and growth campaign contracts remain design material in the [roadmap](/docs/roadmap), not confirmed members of this deployed four-contract suite.

# FOSNFT & Processor

## Mint entry point

`buyAndMint(lotteryType, tokenURI)` is called on FOSNFT with type 3, 13, or 25. It checks the next position. Ordinary positions require exact configured ETH price; positions 10, 100, 200, 300, and 400 require zero purchase value. Successful execution mints the NFT, registers the collectible through the authorized FOSNFT→Processor path, transfers the matching cycle contribution, and optionally issues a Verify certificate.

## Payment split

| Collection | Type ID | Nominal price | Admin fee | Admin per paid mint | Pool contribution per collectible | Full 500-collectible pool |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Buddy | 3 | $3 | 5% | $0.15 | $2.85 | $1,425 |
| Samurai | 13 | $13 | 3% | $0.39 | $12.61 | $6,305 |
| Noble | 25 | $25 | 2% | $0.50 | $24.50 | $12,250 |

Dollar amounts describe the product model, not a dollar-denominated contract balance or guaranteed allocation. Payments and allocations use native ETH. Read the configured on-chain price before sending a transaction; the production USD-to-ETH conversion policy is not supplied in the contract specification.

```text
adminCut = price * adminBps / 10000
prizeShare = price - adminCut
```

The admin amount is retained in FOSNFT. Free-position pool contributions are paid from its balance. Admin withdrawal must leave sufficient reserves for free positions still to come. Processor must reject a contribution that differs from the cycle's stored contribution. No fee is deducted again when recipient allocations are calculated.

## Cycle state

Each collection has separate consecutive cycles. Collectible registration increments the cycle collectible count and `purchaseCount[user][type]`. At cycle start the capacity, per-collectible pool contribution, recipient group counts/percentages, and double-weighted collectible count are stored for that cycle. Changed settings affect future cycles, except updates permitted for an empty active cycle.

Target capacity is 500; old 20-collectible examples are historical tests. The specification does not supply the full cycle-state ABI or the final bridging callback names, so conceptual lifecycle labels must not be treated as callable methods.

## Selection pool

Collectibles 1–100 contribute two weighted entries; collectibles 101–500 one. After selecting a collectible, remove all entries for that collectible before drawing again. Distinct-collectible selection allows the same wallet to be selected via multiple collectibles. Positions 10 and 100 combine zero purchase payment with double weight.

## Randomness lifecycle

1. FOSNFT registers collectible 500 with Processor on Robinhood Chain. That cycle closes to further collectibles.
2. A cycle-specific randomness request is sent through Chainlink CCIP to the Base-side integration.
3. Chainlink VRF on Base produces verifiable randomness.
4. CCIP returns the result to the Robinhood-side integration.
5. Processor uses the returned randomness and collectible weights to select 17 distinct collectibles and process allocations.
6. After the selection completes, the next cycle of that collection starts automatically.

The last mint starts this asynchronous sequence. Selection, transfers, and the next cycle do **not** all finish in the last buyer's transaction. Bridge contract names, callbacks, fee funding, supported CCIP lane, and deployed bridge addresses must be checked against the final implementation; this repository contains documentation, not those Solidity contracts.

Implementation validation must verify request/cycle binding, allowed CCIP sender/source chain, VRF callback authority, replay protection, stale responses, and exactly-once finalization. Those requirements are not claims that an unaudited deployment already implements them.

## Allocation and deferred payment

| Group | Count | Group share | Each collectible |
| :--- | ---: | ---: | ---: |
| Primary | 1 | 50% | 50% plus residue |
| Secondary | 6 | 30% | 5% |
| Tertiary | 10 | 20% | 2% |

All integer-rounding residue goes to the primary recipient. Direct ETH transfer is attempted; failed transfers are booked in `pendingWithdrawals` and collected with `claim()`. A rejected recipient must not be documented as forcing the entire selection to revert.

## Unsupported historical assumptions

The supplied update does not establish `liquidatePool()`, a permissionless selection retry ABI, an 18-transfer gas stipend, fee reimbursement, a metadata-retirement guarantee, or a fixed 100-generation limit. Validate those separately if required. Never replace the specified VRF/CCIP flow with production `timestamp`/`prevrandao` selection.

# Referral Contract

Referral manages registered wallets and independent paid plans on Robinhood Chain. It does not mint FOSNFT collectibles, select recipients, or calculate their allocations.

## Initial rates

| Referrer's active plan | Share of a direct referral's payment | Admin share |
| :--- | ---: | ---: |
| $2 plan | 50% | 50% |
| $5 plan | 60% | 40% |
| $10 plan | 82% | 18% |

The **referrer's own active plan at payment time** determines the split, for both registration and upgrades. The buyer's plan determines the payment amount, not the commission percentage. Without a referrer, 100% goes to the admin. Dollar labels are nominal plan names; exact payment is the configured ETH price.

## Specified write interfaces

| Function | Behavior |
| :--- | :--- |
| `register(address referrer, uint256 tier)` | Register once with tier 2/5/10 and exact configured ETH payment |
| `upgrade(uint256 newTier)` | Upgrade 2→5, 2→10, or 5→10 for the current price difference |
| `claim()` | Withdraw a referrer's deferred transfer balance |
| `withdraw()` | Withdraw available admin funds without taking deferred user liabilities |

The direct referrer must be registered, cannot be self, and cannot be changed after registration. Zero address means no referrer. A referred registration increments `referralCount`; the specification does not describe upgrades as new referral registrations.

## State and reads

| State | Meaning |
| :--- | :--- |
| `isRegistered` | Wallet registration status |
| `userTier` | Wallet's current plan |
| `referredBy` | Fixed direct referrer |
| `referralCount` | Direct registrations referred |
| `totalEarned` | Recorded referral earnings |
| `pendingWithdrawals` | Deferred ETH owed to the wallet |
| `tierPrice` | Configured ETH price for each plan |
| `tierReferrerBps` | Plan's commission rate in basis points |
| `adminWallet` | Admin beneficiary |

Useful reads are `getUpgradeCost`, `getUserInfo`, `getReferralLink`, and `adminWithdrawable`. The supplied summary does not provide their complete ABI types, so use the verified ABI rather than inventing return tuple layouts. Main specified events are `Registered`, `Upgraded`, and `PaymentDeferred`; event argument signatures are not supplied.

## Accounting

```text
cost = tierPrice[newTier] - tierPrice[oldTier]
refAmount = floor(payment * tierReferrerBps[userTier[directReferrer]] / 10000)
adminAmount = payment - refAmount
```

Without a direct referrer, `refAmount = 0`. The referrer's active plan at payment time applies to registration and upgrade payments. Later plan changes never recalculate already processed payments. Admin funds must exclude `pendingWithdrawals` liabilities.

## Authority and Verify integration

Owner controls include prices, percentages, admin wallet, and Verify connection. Prices must remain strictly ordered 2 < 5 < 10. When Verify is connected and Referral is an approved minter, initial registration issues a certificate with origin type 5, origin ID 0, and empty URI. Upgrade certificate issuance is not defined.

See [public referral examples](/docs/referral). Test ETH prices reported in the specification are not production prices. Validate exact amount enforcement, unauthorized reconfiguration, rejected receiver claims, and reentrancy before deployment.

# Verify Contract

Verify issues a separate ERC-721 certificate for supported official events. It does not hold allocation pools, run referrals, pay allocations, or perform recipient selection.

## Origins

| ID | Constant | Use |
| ---: | :--- | :--- |
| 1 | `ORIGIN_FREE_MINT` | Free mint/campaign |
| 2 | `ORIGIN_LOTTERY` | Official FOSNFT cycle mint |
| 3 | `ORIGIN_STORY` | Story/content |
| 4 | `ORIGIN_ADMIN` | Manual admin issuance |
| 5 | `ORIGIN_REFERRAL` | Initial referral registration |

Owner may define or enable/disable origin types using `setOriginType`.

## Issuance and authorization

- `adminMint(to, originTypeId, originId, uri)` is limited to owner or `adminWallet`.
- `mintFromContract(to, originTypeId, originId, uri)` requires `approvedMinters[msg.sender] == true`.
- Owner authorizes a source with `setApprovedMinter`; the source sets its Verify connection with `setVerifyContract` under its own access controls.
- Ordinary wallets cannot directly mint certificates.

FOSNFT's connected mint path issues origin type 2, `originId = fosTokenId`, and the supplied URI. Referral's connected registration path issues origin type 5, origin ID 0, and empty URI. The specification does not issue a new certificate on referral upgrade. Processor has no direct Verify integration in the supplied design.

## Records

Token IDs begin at 1 and increase. `getNftInfo` exposes the record; `totalMinted` gives the issuance count.

| Field | Meaning |
| :--- | :--- |
| `exists` | Record is registered |
| `active` | Current validity flag |
| `originType` | Origin category |
| `originContract` | Source contract or issuing caller |
| `originId` | Source event/asset identifier |
| `minter` | Initial recipient of the Verify NFT |
| `createdAt` | Issuance timestamp |

`minter` is historical provenance, not current ownership. Read ERC-721 ownership for the current holder. A certificate and its linked FOSNFT are separate tokens.

## Check current status

| Code | Status | Meaning |
| ---: | :--- | :--- |
| 0 | `NOT_REGISTERED` | No record |
| 1 | `OFFICIAL_ACTIVE` | Official and currently active |
| 2 | `OFFICIAL_REVOKED` | Officially issued but revoked |

**`isOfficial(tokenId)` checks existence only. It may return true for a revoked token.** Interfaces must use `getStatus` to display current validity.

Only owner may `revoke(tokenId, reasonCode)`. Revocation sets `active = false`; it does not burn the NFT, transfer ownership, or erase the record/history. Owner also manages approved minters, origins, admin wallet, and URI configuration. `adminWallet` can issue manual certificates but is not described as having owner-only revocation authority.

# Free Mint Architecture

## Specified per-cycle free positions

FOSNFT makes positions 10, 100, 200, 300, and 400 free in each Buddy/Samurai/Noble cycle. The user sends zero purchase value and pays network gas. FOSNFT funds each collectible's configured pool contribution from its own balance; admin withdrawals preserve the reserve for remaining free positions. Collectibles 10 and 100 also have double selection weight.

These positions use the ordinary `buyAndMint(lotteryType, tokenURI)` path. They are not restricted to a Genesis allowlist in the supplied summary.

## Separate Genesis campaign

The older roadmap describes a social whitelist and gas-only Genesis mint window, potentially using Merkle proofs and limited per-wallet allocations. The updated four-contract specification does not define that campaign's deployed contract, proof layout, quotas, dates, early-adopter bonus, or inclusion in paid collection cycles.

Treat those details as planned campaign configuration until published. A Verify origin category for free mint (type 1) enables certificate classification; it does not by itself implement an allowlist campaign. Do not promise that a Genesis asset automatically includes a Processor collectible or higher-tier allocation.

See [Free Mint Campaign](/docs/campaigns/free-mint) and [FOSNFT & Processor](/docs/technical/allocation-contract).

# Campaign & Leaderboard Design

The existing roadmap describes a separate growth campaign targeting 5,000 users, a 30-day window, milestones $20k/$50k/$100k/$200k/$500k/$1M/$2M, and 50/30/20 allocations to the top three leaderboard accounts. The new contract specification does not supply a campaign ABI, deployment, automatic activation proof, or funded milestone state. Those remain design targets rather than live guarantees.

## Funding boundary

Only available admin funds may be committed to a campaign. Referral admin receipts vary with the direct referrer's current $2/$5/$10 plan (50%/40%/18%), or 100% without a referrer. FOSNFT retains collection-specific admin fees (5%/3%/2%) but must reserve funding for remaining free positions. Neither Processor pools nor deferred user payments may be redirected as campaign revenue.

The new summary does not establish automatic routing to a campaign vault. Publish that adapter/funding implementation before treating it as active.

## Required campaign specification

Confirm the user-count source, activation authority/date, funding window, incremental versus cumulative milestone funding, unique snapshots, tie-break rules, rounding, claim eligibility, and recovery behavior. A dollar milestone table is arithmetic, not evidence that funds exist. Do not allocate the same funded balance again at multiple milestones.

## Leaderboard

Retained product scoring is direct referral +1, Buddy purchase +2, Samurai +4, Noble +6. The supplied summary provides `referralCount` and `purchaseCount`; it does not establish an on-chain global ranking or new points for referral upgrades. Verify the app/indexer scoring and snapshots before making allocation settlement claims.

The campaign is separate from the 500-collectible cycle's 17-recipient selection. Its planned three-account 50/30/20 split must not be confused with the cycle's 1/6/10 collectible groups. See [Growth Campaign](/docs/campaigns/growth).

# Main Application Integration

This Next.js repository is the documentation website. Older PHP paths and wallet functions described in previous drafts are main-application design references; their implementation is not present here. The supplied contract update defines the following integration requirements.

## Wallet and network

Use Robinhood Chain for user transactions. Confirm `eth_chainId` matches the selected environment: mainnet 4663, testnet 46630. A Base wallet balance or Base Sepolia chain ID is not a substitute. Obtain RPC/explorer settings from the [network reference](/docs/protocol/platform), keeping environments separate.

## Mint interface

1. Read collection type, cycle state, next collectible position, and exact configured ETH price.
2. Show nominal dollar labels separately from the required ETH transaction value.
3. For positions 10, 100, 200, 300, and 400, send zero purchase value and show the wallet's network gas estimate.
4. Submit `buyAndMint(lotteryType, tokenURI)` using the verified FOSNFT ABI and address.
5. Wait for a successful receipt, then refresh NFT/collectible data. Handle next-position races by refreshing and asking the user to sign a new transaction.
6. After collectible 500, display pending randomness/delivery until the cross-chain result and selection finalization are confirmed. Do not show a receipt as completed allocation settlement.

## Referral interface

Display current plan prices and commission rates from the contract. Registration selects 2/5/10 and a valid direct referrer or zero address. Upgrade options are only higher plans. Read `getUpgradeCost` immediately before signing. Explain that the referrer's current plan sets the split, and upgrades retain the original `referredBy`.

Show direct payments separately from `pendingWithdrawals`. Referrers claim deferred ETH with `claim()`; admin `withdraw()` is a different permissioned operation. Refresh balances and plan status after confirmed receipts.

## Certificate interface

Use Verify `getStatus` for current validity, `getNftInfo` for origin details, and ERC-721 ownership for the current holder. Do not call a revoked certificate active just because `isOfficial` is true. Show original recipient separately from current owner.

## Leaderboard and campaigns

The retained scoring design is referral +1, Buddy +2, Samurai +4, Noble +6. Upgrade points, free-mint points, time-period ranking, and campaign snapshots require the final app/indexer policy; the supplied contract summary does not define all of them. `referralCount` and `purchaseCount` are evidence for indexing, not a complete specified leaderboard ABI.

## Operational views

Show collection/cycle identifiers, Robinhood transaction hashes, pending randomness, Base VRF request correlation, CCIP delivery state, selected collectible IDs, attempted payments, and deferred claims. Filter logs by chain and contract version; validate server responses and never ask users for wallet private keys.

# Security & Validation

The supplied contract summary describes intended behavior. This repository does not include Solidity sources, final ABIs, independent audit reports, or evidence of a deployed VRF/CCIP lane. An audit, timelock, multisig, or public retry function must not be claimed as completed solely because it appeared in an older draft.

## Authority and funds

Referral owner can change prices, percentages, admin wallet, and Verify connection. Verify owner controls authorized minters, origin types, URI configuration, and revocation. Cycle settings are stored per cycle; updates generally apply to future cycles, with permitted empty-cycle updates. Publish real deployment roles and settings after verification.

The interface does not hold private keys, but contracts hold pool funds, free-position reserves, and deferred payment liabilities. Native ETH is volatile; automation does not remove smart-contract, network, or regulatory risks.

## Required contract checks

- Registration: once per wallet, registered non-self referrer, zero-address path, exact payment, fixed `referredBy`.
- Plans: strict price ordering, higher-plan upgrades only, current difference payment, referrer's current basis-point rate, no retroactive payment changes.
- Funds: admin withdrawable balance excludes pending claims and FOSNFT's remaining free-collectible reserve.
- Mint: only FOSNFT registers in Processor; exact contribution matching; independent collection cycles; free positions send zero purchase value.
- Selection: double-weighted entries are removed together after selection; 17 distinct collectibles; repeated wallet recipients allowed; rounding residue assigned to primary.
- Claims: failed pushes create correct liabilities; successful claims cannot repeat; transfers and claims resist reentrancy.
- Verify: only approved issuers; origin linking; initial recipient versus current owner; revoked records remain official but inactive.

## Cross-chain checks

Verify the actual CCIP-supported lane and configured routers/senders, Base VRF environment and authorization, cycle/request correlation, replay/stale response rejection, and exactly-once finalization. Test delayed messages, failed request delivery, failed return delivery, unavailable fee balances, and rejected recipient transfers.

Keep a pending cycle visible when randomness is unavailable. Do not substitute block timestamps, `prevrandao`, or an operator-selected result for the specified VRF design. A supported retry/recovery path and the fee-funding policy must come from the final implementation; the specification does not supply their callable ABI.

## Operational readiness

Use verified full addresses and ABIs per environment, verify deployed bytecode and role owners, check RPC chain ID, and monitor both chains. Multisig/timelock protection, unit/invariant/fuzz tests, independent audit, and privacy/access controls are recommended checks, not verified features of this documentation repository.

No implemented 365-day liquidation guarantee, fixed 18× gas multiplier, or no-risk claim is supported by the new contract summary.

# APIs & Data Models

## Routes implemented in this repository

| Endpoint | Method | Behavior |
| :--- | :--- | :--- |
| `/api/search` | GET | Static Fumadocs/Orama documentation search index |
| `/api/chat` | POST | Gemini response to JSON containing a string `message` |

Chat requires `GEMINI_API_KEY` and outbound HTTPS to `generativelanguage.googleapis.com`. It uses `gemini-2.5-flash`. Without credentials it returns a configuration error. The assistant is informational; it cannot verify contract deployment, sign transactions, or supply legal/financial advice.

Older `/api/*.php`, `/status`, `/allowlist/proof`, and `/allocation/:wallet` examples are not implemented by this Next.js site. Do not present them as deployed endpoints.

## Main-application integration models

These are recommended indexing fields, not published contract tuple signatures or confirmed REST APIs.

| Model | Important fields |
| :--- | :--- |
| Referral user | chain ID, wallet, isRegistered, userTier, referredBy, referralCount, totalEarned, pendingWithdrawals |
| Collectible | chain ID, FOSNFT address, token ID, collection type, cycle ID, collectible position, original purchaser, weight, transaction hash |
| Cycle | collection type, cycle ID, stored capacity/contribution/group rules, collectible count, pool balance, request correlation, finalization status |
| Allocation | cycle ID, selected collectible, recipient, allocated ETH, transfer outcome, claim transaction |
| Certificate | Verify address, token ID, originType, originContract, originId, initial recipient, current owner, getStatus result |

Confirm every indexed transaction against the correct chain, contract address/version, and successful receipt. Avoid double-counting repeated events or CCIP deliveries. Display nominal USD calculations separately from actual ETH accounting.

## Terminology

- **VRF:** verifiable randomness produced on the specified Base integration.
- **CCIP:** messaging carrying a cycle request/result between Base and Robinhood.
- **Collectible:** a registered cycle entry associated with a mint; uniqueness of selection is at collectible level.
- **Deferred payment:** owed ETH recorded for a later `claim()` after direct transfer fails.
- **Origin certificate:** a separate Verify NFT; issuance and active status are distinct.

See [network metadata](/docs/protocol/platform) and [contract reference](/docs/technical/smart-contracts).
