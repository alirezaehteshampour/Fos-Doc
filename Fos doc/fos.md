<!-- Generated from current content/docs by scripts/generate-doc-artifacts.py. -->

# FOS Protocol Overview

FOS offers **Fos Digital Collectibles** as NFT consumer products, with protocol-defined **promotional distributions**, an independent referral program, and authenticity certificates on **Robinhood Chain**. Base remains the randomness-service chain in the supplied architecture: Chainlink VRF produces the random result there, and Chainlink CCIP carries requests and responses between Base and Robinhood.

## Independent components

| Component | Responsibility |
| :--- | :--- |
| FOSNFT | Mint the collectible, receive payment, retain admin fees, and fund free positions |
| Processor | Register collectibles, manage collection cycles, select recipients, and process allocations |
| Referral | Register one account per wallet, maintain direct referrals, sell plans, and handle upgrades |
| Verify | Issue a separate ERC-721 authenticity certificate and expose its current status |

Referral registration is independent of NFT minting and selection processes. Verify integrations are optional and require explicit authorization.

## Collection economics

| Collection | Type ID | Nominal price | Admin fee | Admin per paid mint | Pool contribution per collectible | Full 500-collectible pool |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Buddy | 3 | $3 | 5% | $0.15 | $2.85 | $1,425 |
| Samurai | 13 | $13 | 3% | $0.39 | $12.61 | $6,305 |
| Noble | 25 | $25 | 2% | $0.50 | $24.50 | $12,250 |

Dollar amounts describe the product model, not a dollar-denominated contract balance or guaranteed allocation. Payments and allocations use native ETH. Read the configured on-chain price before sending a transaction; the production USD-to-ETH conversion policy is not supplied in the contract specification.

Each collection has independent 500-collectible cycles. Positions 10, 100, 200, 300, and 400 are gas-only for the buyer, with their pool contributions funded from FOSNFT. Collectibles 1–100 carry double selection weight; collectibles 101–500 carry ordinary weight.

## Allocation rules

Seventeen distinct **collectible mint records**, not necessarily seventeen wallets, are selected without replacement. The primary record's recipient receives 50% of the cycle allocation pool; six records' recipients split 30%; ten records' recipients split 20%. A wallet with several recorded mints can receive more than one allocation. Integer-rounding residue goes to the first recipient. Transfers are attempted directly; unsuccessful transfers become claimable through `pendingWithdrawals` and `claim()`.

## Referral plans

| Referrer's active plan | Share of a direct referral's payment | Admin share |
| :--- | ---: | ---: |
| $2 plan | 50% | 50% |
| $5 plan | 60% | 40% |
| $10 plan | 82% | 18% |

The **referrer's own active plan at payment time** determines the split, for both registration and upgrades. The buyer's plan determines the payment amount, not the commission percentage. Without a referrer, 100% goes to the admin. Dollar labels are nominal plan names; exact payment is the configured ETH price.

Allowed upgrades are 2→5, 2→10, and 5→10. The payment is the difference between configured prices at upgrade time, and the original direct referrer stays fixed.

## Read more

- [Platform and networks](/docs/protocol/platform)
- [Collection mechanics](/docs/protocol/mechanics)
- [Referral program](/docs/referral)
- [Contract reference](/docs/technical/smart-contracts)
- [Community and planned campaigns](/docs/protocol/community)
- [Roadmap](/docs/roadmap)
- [Legal and risk disclosures](/docs/protocol/legal)

## Documentation status

This revision follows the supplied project contract specification. Product rules and reported deployments are distinct from independently verified on-chain behavior. Older claims about globally immutable parameters, same-transaction selection processes, a fixed 18× gas charge, and an implemented 365-day liquidation function are not established by the new specification. See [security and validation](/docs/technical/security).

# Platform Infrastructure

## Networks

User-facing FOSNFT, Processor, Referral, and Verify interactions belong on **Robinhood Chain**, not Base. Base serves the specified VRF randomness integration, with CCIP transporting cycle requests and results.

| Network | Chain ID | Native currency | Role |
| :--- | ---: | :--- | :--- |
| Robinhood Chain | 4663 | ETH | User-facing project network |
| Robinhood Chain Testnet | 46630 | Test ETH | Separate testing network |
| Base | Environment-specific | ETH | VRF service side of the specified cross-chain design |

The Robinhood IDs, currency, and URLs below are corroborated by the public [ethereum-lists network registry](https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-4663.json), with a [separate testnet entry](https://github.com/ethereum-lists/chains/blob/master/_data/chains/eip155-46630.json). This corroborates network metadata; it does not verify FOS deployments or CCIP support.

- Mainnet RPC listed in the registry: `https://rpc.mainnet.chain.robinhood.com`
- Mainnet explorer listed in the registry: [Robinhood Chain Blockscout](https://robinhoodchain.blockscout.com)
- Testnet RPC: `https://rpc.testnet.chain.robinhood.com/rpc`
- Testnet explorer: [Robinhood testnet explorer](https://explorer.testnet.chain.robinhood.com)
- Official documentation linked by the registry: [Robinhood Chain documentation](https://docs.robinhood.com/chain)

Verify the selected environment and live RPC chain ID before signing. Never reuse Base or Base Sepolia addresses for a Robinhood transaction. The Base environment used by the VRF integration must be confirmed separately.

## ETH pricing and gas

The displayed dollar values are nominal product labels. On-chain ETH prices and cycle settings are the transaction source of truth. Ordinary mints require the exact configured price; free positions require zero purchase value. Network gas still applies. ETH remains volatile, and neither fixed gas costs nor USD-equivalent awards are guaranteed.

## Wallet access

Use an EVM wallet configured for the correct Robinhood network. MetaMask and Coinbase Wallet are documented integration targets; connector behavior must be verified in the deployed main application. This Next.js repository hosts documentation and an AI assistant, not the minting application itself.

The interface does not need a user's private key. Contracts nevertheless hold cycle funds, reserved free-position contributions, and deferred payments according to their rules. An interface described as non-custodial does not mean that funds never enter a contract.

## Cross-chain visibility

Show Robinhood cycle status and transaction receipts separately from Base VRF and CCIP delivery status. A successful last-mint receipt is not evidence that the remote random result has arrived or that the allocation transaction has completed.

# Collection & Protocol Mechanics

## Minting

Call `buyAndMint(collectionType, tokenURI)` on FOSNFT on Robinhood Chain. The documented type IDs are 3 (Buddy), 13 (Samurai), and 25 (Noble). A successful transaction mints a Fos Digital Collectible, registers its mint record with Processor, and sends the cycle's configured allocation-pool contribution to Processor. Only FOSNFT may register those records there. If Verify is connected and FOSNFT is approved, a separate authenticity certificate is also issued.

Throughout this reference, numbered collectibles refer to the mint records used for protocol-defined promotional distributions. Each collectible has one mint record; selection uniqueness applies to that record, while a wallet can have several recorded mints. Product wording does not change the selection mechanism or the number of allocations.

## Prices and accounting

| Collection | Type ID | Nominal price | Admin fee | Admin per paid mint | Pool contribution per collectible | Full 500-collectible pool |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| Buddy | 3 | $3 | 5% | $0.15 | $2.85 | $1,425 |
| Samurai | 13 | $13 | 3% | $0.39 | $12.61 | $6,305 |
| Noble | 25 | $25 | 2% | $0.50 | $24.50 | $12,250 |

Dollar amounts describe the product model, not a dollar-denominated contract balance or guaranteed allocation. Payments and allocations use native ETH. Read the configured on-chain price before sending a transaction; the production USD-to-ETH conversion policy is not supplied in the contract specification.

For each paid collectible:

```text
adminCut = price * adminBps / 10000
prizeShare = price - adminCut
```

The admin share remains in FOSNFT. There is no additional admin deduction from recipients' allocations. The amount sent to Processor must equal the contribution stored for that cycle.

## Five gas-only positions

Positions **10, 100, 200, 300, and 400** are free in every cycle of every collection. The buyer pays network gas but sends zero purchase value. FOSNFT supplies the full pool contribution for each free collectible. Admin withdrawals must preserve the reserve for remaining free positions.

For a full cycle there are 495 paid positions and 5 funded free positions. In nominal dollars:

| Collection | Buyer purchase inflow | Gross admin share from 495 paid positions | Free-position funding | Remaining admin amount | Cycle pool |
| :--- | ---: | ---: | ---: | ---: | ---: |
| Buddy | $1,485 | $74.25 | $14.25 | $60.00 | $1,425 |
| Samurai | $6,435 | $193.05 | $63.05 | $130.00 | $6,305 |
| Noble | $12,375 | $247.50 | $122.50 | $125.00 | $12,250 |

These calculations exclude gas, oracle/bridge costs, and any other operating costs. The pool plus remaining admin amount equals the 495 buyers' total purchase payments.

## Weights and uniqueness

Collectibles 1–100 have two entries each in the selection pool; 101–500 have one. Positions 10 and 100 are both free and double-weighted. The initial full-cycle selection pool contains 600 entries.

After a collectible's mint record is selected, all of its weighted entries are removed. That record cannot be selected again in the cycle. A wallet with multiple recorded mints may receive more than one allocation through distinct records. Double weight is a relative selection weight, not a guarantee of an allocation or a claim that every final inclusion probability is exactly doubled.

## Green Eye and asynchronous selection

The 500th collectible closes the cycle and is known as the Green Eye.

1. FOSNFT registers collectible 500 with Processor on Robinhood Chain. That cycle closes to further collectibles.
2. A cycle-specific randomness request is sent through Chainlink CCIP to the Base-side integration.
3. Chainlink VRF on Base produces verifiable randomness.
4. CCIP returns the result to the Robinhood-side integration.
5. Processor uses the returned randomness and collectible weights to select 17 distinct collectibles and process allocations.
6. After the selection completes, the next cycle of that collection starts automatically.

The last mint starts this asynchronous sequence. Selection, transfers, and the next cycle do **not** all finish in the last buyer's transaction. Bridge contract names, callbacks, fee funding, supported CCIP lane, and deployed bridge addresses must be checked against the final implementation; this repository contains documentation, not those Solidity contracts.

Do not assume a fixed 18× gas charge or an automatic fee reimbursement. Each transaction has its own gas cost, and oracle/CCIP fees depend on the final integration.

## Distribution and claims

| Group | Selected collectibles | Share of pool | Per-collectible share |
| :--- | ---: | ---: | ---: |
| Primary | 1 | 50% | 50% plus integer-rounding residue |
| Secondary | 6 | 30% | 5% |
| Tertiary | 10 | 20% | 2% |

Processor attempts direct payment. A rejected payment is recorded in `pendingWithdrawals` for a later `claim()` rather than described as reverting every recipient's payment.

## Cycle settings

Capacity, contribution per collectible, group counts/splits, and the number of double-weighted positions are recorded at cycle start. Changes apply to subsequent cycles; an empty active cycle may be updated where the contract permits. The target capacity is 500; old 20-collectible settings were tests.

The new specification does not establish the previously described 365-day `liquidatePool()` mechanism. Do not rely on that recovery path unless it is confirmed in the final deployed contract.

# Referral Program

Referral is independent of NFT purchases and cycle allocations. Each wallet registers once with a plan and, optionally, an existing registered direct referrer.

## Plans and payment splits

| Referrer's active plan | Share of a direct referral's payment | Admin share |
| :--- | ---: | ---: |
| $2 plan | 50% | 50% |
| $5 plan | 60% | 40% |
| $10 plan | 82% | 18% |

The **referrer's own active plan at payment time** determines the split, for both registration and upgrades. The buyer's plan determines the payment amount, not the commission percentage. Without a referrer, 100% goes to the admin. Dollar labels are nominal plan names; exact payment is the configured ETH price.

## Register and share

Call `register(address referrer, uint256 tier)` with tier **2**, **5**, or **10** and exact configured payment. The referrer must already be registered and cannot be the registering wallet. Use the zero address to register without a referrer. The wallet address identifies the referral link; `referredBy` records the direct referrer permanently. A registration with a referrer increases that referrer's `referralCount` by one.

## Upgrade by paying the difference

Registered users may call `upgrade(uint256 newTier)` to move 2→5, 2→10, or 5→10. Downgrades and registering the same wallet again are prohibited.

```text
cost = tierPrice[newTier] - tierPrice[oldTier]
```

Read `getUpgradeCost` and the current prices before submitting. Nominal differences are $3, $8, and $5 respectively; actual payment uses the current configured ETH difference. The upgrade is split with the **same original direct referrer**. Without one, the full upgrade payment goes to the admin.

## Example

1. A has the $2 plan. B registers through A with the $2 plan. A receives 50% of that payment, nominally $1.
2. A upgrades to the $10 plan.
3. B later upgrades from $2 to $5 and pays the nominal $3 difference.
4. A now receives 82% of that difference, nominally $2.46; the admin receives $0.54.

If A had stayed on the $2 plan, even a $10 registration by B would use A's 50% rate. A's upgrade changes only subsequent payments; previous payments are never recalculated.

## Single-level accounting

If A refers B and B refers C, A can receive a share of B's registration and upgrades. C's registration and upgrades can pay B, not A. Plan levels are price/commission plans, not additional generations of referral compensation.

## Direct payment and deferred claims

The contract attempts direct ETH payment to the referrer. If that transfer fails, it records the amount in `pendingWithdrawals`; the referrer uses `claim()` to collect it. `withdraw()` is for the admin's available balance, not the referrer's claim function.

## Configuration and risk

The owner can change plan prices, commission basis points, the admin wallet, and the Verify connection. Price ordering must remain `price(2) < price(5) < price(10)`. Initial documented rates are 5000, 6000, and 8200 basis points out of 10000. Read current settings rather than assuming those values are globally immutable.

Reported test prices of 0.0000002, 0.0000005, and 0.000001 ETH are test settings, not production USD conversion rates. Referral participation and any tax obligations remain the user's responsibility. Payments depend on actual direct-referral activity and do not guarantee income.

See [Referral Contract](/docs/technical/referral-contract) and [Verify](/docs/technical/verification-contract).

# Community & Growth

## Recognition points

| Action | Retained product score |
| :--- | ---: |
| Valid direct referral registration | +1 |
| Buddy purchase | +2 |
| Samurai purchase | +4 |
| Noble purchase | +6 |

Referral `referralCount` records direct registrations; `purchaseCount[user][type]` records collection activity. The final app/indexer must define the ranking period, free-position treatment, and tie-breaking. Referral upgrades change the plan and commission rate, not the number of direct registrations; no new upgrade-points rule is supplied.

Points are recognition metrics and are distinct from collectible selection weight and referral commissions. Changing a referral plan does not change the 1–100 double-weight rule in a selection.

## Genesis access

The retained roadmap proposes social verification through X, Discord, YouTube, and Telegram, followed by a gas-only Genesis campaign for eligible wallets. Actual launch dates, quotas, proof format, and early-adopter benefits require campaign configuration. Genesis eligibility must not be confused with the five ordinary cycle positions that are free for the buyer.

## Growth campaign

The planned separate campaign targets 5,000 users and a 30-day window, with milestones and a top-three 50/30/20 split. Activation, funds, deployment, and snapshots are not verified in the new contract summary. Any funding must use available admin receipts after free-position reserves and deferred user liabilities, never Processor's cycle pool.

See [Leaderboard](/docs/leaderboard), [Campaigns](/docs/campaigns), [campaign design](/docs/technical/campaign-contract), and the [16-phase roadmap](/docs/roadmap).

# Leaderboard

The retained FOS product scoring design recognizes valid direct referral registrations (+1), Buddy purchases (+2), Samurai purchases (+4), and Noble purchases (+6).

| Action | Points |
| :--- | ---: |
| Valid direct referral registration | +1 |
| Buddy purchase (nominal $3) | +2 |
| Samurai purchase (nominal $13) | +4 |
| Noble purchase (nominal $25) | +6 |

The current contract summary describes `referralCount` and `purchaseCount[user][type]`. It does not establish the final leaderboard indexer, daily/weekly ranking API, tie-breaking implementation, points for upgrades, or the scoring treatment of free positions. Check the final application policy rather than inferring those rules from the counters.

## Separate mechanisms

- Referral plan level determines the share of future payments from direct referrals.
- Collectible position determines 2× or 1× selection weight in a collection cycle.
- Leaderboard points measure activity for recognition and any separately configured campaign.

None of these substitutes for another. A wallet may hold several cycle collectibles and receive multiple allocations through distinct collectibles; the leaderboard does not choose those recipients.

## Planned growth campaign

The roadmap describes top-three campaign allocations at funded milestones with a 50/30/20 split. The campaign remains a separate design whose deployment and funding are not confirmed by the supplied update. See [Growth Campaign](/docs/campaigns/growth) for targets and [technical constraints](/docs/technical/campaign-contract).

# Public Roadmap

This is a development roadmap, not evidence that every feature has launched. The current core specification places user-facing contracts on Robinhood Chain, uses Base VRF through CCIP, and provides three referral plans. Genesis/campaign contracts, launch status, and future features need separate deployment confirmation.

## Phase 1 — Community Introduction & Whitelist Access Program

This phase focuses on onboarding the first members of the ecosystem and establishing a foundation of verified early supporters.

- Launch of the official website and ecosystem overview
- Introduction of the FOS Protocol across the community channels
- Opening of the Whitelist Access Program for early adopters
- Participation-based tasks designed to help users learn about the platform and engage with the community
- Whitelisted users receive priority access to the next participation stage

The Whitelist is a contribution-based access layer, not a financial feature. It is designed to recognize genuine community participation rather than speculation.

## Phase 2 — Genesis Free-Mint Access (Whitelisted Users Only)

Following the whitelist period, a dedicated Free-Mint Campaign is opened exclusively to verified members.

- Whitelisted users may mint selected FOS Digital Collectibles
- Participation requires network gas only (no protocol fee during this window)
- Genesis assets and any Processor cycle eligibility must follow the separately published campaign configuration
- The objective of this phase is to reward early contributors and establish the first active user base

This phase reinforces our principle of accessibility and loyalty recognition, while remaining fully aligned with the protocol's product-first architecture.

## Phase 3 — Limited-Access Application Release (Stability Validation Stage)

Before enabling full public access, the platform enters a restricted availability period.

- The application is opened to a limited number of users
- System performance, UX behavior, and contract execution are monitored
- Feedback from real-world usage is incorporated
- Technical and operational stability are validated

Only after the protocol demonstrates reliability in this controlled environment does the platform proceed to full availability.

## Phase 4 — Public Launch & Open Access

After stability validation, the protocol becomes publicly accessible.

- Full public access to the application
- Ongoing onboarding of new participants
- Continued growth through community-driven initiatives
- Expansion of ecosystem transparency and engagement tools

Cycles follow their stored settings and asynchronous randomness lifecycle. Authorized owner controls and oracle/bridge operations remain part of the documented architecture.

## Phase 5 — Growth Campaign (Activated at 5,000 Users)

Once the ecosystem reaches 5,000 verified participants, the protocol activates a time-limited Growth Campaign Layer as defined in the technical and economic documentation.

- The campaign operates for a predefined time window
- A separately configured campaign may receive available admin funds after free-position reserves and deferred-user liabilities
- Distributions occur based on milestone thresholds
- Allocation follows a published structure and is tied to leaderboard performance and contribution ranking

Participation in the campaign is optional, does not affect product purchase consideration, and remains strictly promotional in nature.

## Phase 6 — FOS Lab: Innovation Playground

FOS Lab is where new ideas are born, tested, and refined together with the community.

This is a controlled experimental environment where we introduce and test new participation mechanics, new pool structures, and new interaction models — without affecting the stability of the live system.

**What users get:**
- Early access to experimental features
- A safe testing space separate from the main platform
- Opportunities to share feedback and influence feature development
- A community-driven innovation loop

FOS Lab is where ideas evolve into real features.

## Phase 7 — Desktop Experience Upgrade

FOS expands beyond mobile with a fully-optimized desktop experience designed for active users and long session interaction.

**What users get:**
- A redesigned interface for large screens
- Enhanced navigation and workspace layout
- Better visibility of cycles, history, and activity
- A smoother, more efficient user workflow

Whether you're on mobile or desktop, FOS delivers a consistent, high-quality experience.

## Phase 8 — Expanded Wallet Support

FOS becomes even more accessible by supporting a wider range of Web3 wallets.

**What users get:**
- Support for more browser and mobile wallets
- WalletConnect integration for universal access
- Smoother onboarding for new users
- Future-ready design for smart-wallet standards

Our goal is simple: use the wallet you like — and connect instantly.

## Phase 9 — Multi-Chain Expansion

FOS expands to compatible EVM networks through a security-first rollout strategy.

**What users get:**
- Access to FOS across multiple chains
- Faster transaction options depending on network
- Broader ecosystem participation
- Seamless experience across supported networks

Expansion follows a careful, audit-guided deployment path to ensure stability and trust.

## Phase 10 — Dashboard V2: Transparency Reinvented

Dashboard V2 introduces a new level of clarity, insight, and system visibility.

**What users get:**
- Deeper participation and engagement analytics
- Clear contribution and cycle activity views
- Historical timeline of ecosystem behavior
- Real-time system and transaction insights

Dashboard V2 strengthens our commitment to openness, fairness, and transparency.

## Phase 11 — Advanced User Profile

Built on the foundation of Dashboard V2, the Advanced User Profile transforms the wallet into a living participation identity.

**What users get:**
- Profile identity with optional avatar
- Personal activity timeline
- Participation footprint and engagement history
- Non-financial reputation indicators

Profiles reflect how users grow inside the ecosystem, not just what they hold.

## Phase 12 — Priority Access Mode

Active and committed users gain access to exclusive early-entry opportunities in selected cycles.

**What users get:**
- Early participation windows for top contributors
- Access opportunities based on engagement and consistency
- Recognition through participation effort — not entitlement
- Occasional access to special pools and events

This feature celebrates loyal members who help grow and support the ecosystem.

## Phase 13 — Loyalty Framework

A structured loyalty layer that acknowledges long-term participation and positive ecosystem behavior.

**What users get:**
- Progression based on engagement consistency
- Recognition for holding collectibles
- Participation-based milestones
- Community-value alignment

The loyalty framework is built on trust, contribution, and continuity.

## Phase 14 — Time-Based Digital Collectibles

Collectibles that evolve over time through progressive engagement and responsible holding behavior.

**What users get:**
- Unlockable attributes over time
- Holding-based collectible progression
- Optional transformation mechanics
- A visual reflection of participation history

Time becomes part of the collectible's story and identity.

## Phase 15 — Missions & Group Participation Quests

Participation becomes collaborative and goal-driven through personal and group missions.

**Individual Missions:**
- Engage across cycles
- Complete activity milestones
- Unlock progression achievements

**Group (Squad) Missions:**
- Team-based participation journeys
- Shared targets and milestones
- Cooperative progress experiences

This transforms ecosystem participation into an interactive community adventure.

## Phase 16 — Community Voting & Participation Governance

A gradual introduction of responsible user-driven decision participation.

**What users get:**
- Voting on selected feature proposals
- Participation-aligned voting conditions
- Optional gated voting groups
- Feedback-guided evolution of the ecosystem

Governance is introduced thoughtfully — step-by-step, with stability first.

# Strategic Framework & Legal Identity

The project’s existing policy language is retained below. Product terminology does not establish legal classification, and the supplied technical specification is not a legal opinion. Read the current mechanics and seek qualified jurisdiction-specific advice. Claims about deployed access enforcement or audits require separate operational evidence.

## Brand Identity

**Visual Identity:** The Fos Brand Symbol serves as the visual ambassador, symbolizing adaptability and regeneration within the Web3 ecosystem.

**Target Demographic:** The platform is engineered for Web3 natives, Digital Collectors, and Decentralized Finance (DeFi) participants seeking a trustless reward protocol.

## Product-First Disclaimer

The Fos Digital Collectible is sold as a standalone digital product. Any promotional distribution is ancillary, optional, non-guaranteed, and not consideration for purchase.

## Strategic Nomenclature (Safe Harbor Terminology)

To accurately reflect the protocol's legal status as a Product-Sale with Incentives (and not a gambling platform), the following terminology is strictly enforced across all documentation and interfaces:

- "Reward Distribution" (Not "Prize Pool" or "Lottery").
- "Fos Digital Collectible" (Not "Ticket").
- "Recipient" (Not "Winner").
- "Protocol Activation" (Not "Bet" or "Wager").
- "Automated Selection" (Not "Game of Chance").

## Regulatory Compliance & Consumer Protection

**Data Privacy:** The platform architecture is designed for data minimization. No personal identifiers (Names, Emails, IPs) are stored on-chain; only public wallet addresses are utilized, aligning with GDPR and CCPA principles regarding pseudonymity.

**Risk Disclosure:** Users are presented with a comprehensive Risk Disclaimer regarding the nature of cryptocurrency assets and the immutability of blockchain transactions prior to interaction.

**Legal Basis:** The Fos Protocol operates as a peer-to-peer distribution mechanism. It is not a "House" that users play against; it is an automated software utility that routes value between participants based on configured contract rules; independent audit status must be verified separately.

**Geographic Availability Notice:** The existing project access policy restricts users located in or residents of the United States, Canada, the United Kingdom, the European Economic Area, China, and sanctioned jurisdictions. Access from these jurisdictions is unauthorized.

**Technical Enforcement:** The protocol utilizes Edge Middleware (e.g., Cloudflare) to enforce IP-based blocking. Access is strictly denied for requests originating from the United States, Canada, United Kingdom, and the European Economic Area (EEA).

---

# Official Protocol Disclaimer

## No Financial Advice or Investment

Fos Digital Collectibles are sold strictly as consumer goods for artistic and social utility. No information on this platform constitutes financial advice, investment advice, or a recommendation to buy. You agree that you are purchasing an NFT with **no expectation of profit**, dividends, or capital appreciation.

## Non-Gambling (Promotional Nature)

The Protocol's "Reward Distribution" is an automated, ancillary **loyalty mechanism** designed to reward community participation. It is **not** a lottery, sweepstakes, wager, or game of chance. Participation is incidental to the purchase of the NFT product.

## The "Green Eye" Gas Risk (Critical Warning)

You acknowledge that gas fees on Robinhood Chain fluctuate. The 500th mint closes the round and starts the specified Base VRF/CCIP process. Selection and payments happen later; no fixed gas multiplier is established by the supplied specification. Gas fees are paid to network validators, are non-refundable, and are outside the Fos Team's control.

## Restricted Jurisdictions

This Protocol is **NOT** offered to persons or entities resident in the **United States, Canada, the United Kingdom, or the European Economic Area (EEA)**. Accessing the Protocol from these jurisdictions is a violation of our Terms and is strictly prohibited.

## Smart Contract Autonomy

Allocation rules are stored for each round. Authorized owners can change supported settings, generally for later rounds, and referral prices and rates are configurable. Verify certificates can be revoked by its owner. Completed blockchain transactions cannot be reversed by the interface. You acknowledge that blockchain software is experimental and carries inherent risks, including code vulnerabilities or network failure.

## Limitation of Liability

By interacting with the app, you agree to hold the Fos Team, developers, and affiliates harmless for any losses, including failed transactions, high gas fees, or smart contract exploits. **Use at your own risk.**

---

# Refund & Claim Policy

## No Refunds (Digital Content Waiver)

**ALL SALES ARE FINAL.** Due to the immutable nature of blockchain transactions, payments cannot be reversed once processed.

**Waiver of Withdrawal Rights:** You expressly acknowledge that by initiating the Mint transaction, the **performance of the digital service begins immediately**. You hereby **waive your right of withdrawal** (cooling-off period) under applicable consumer protection laws (including EU Directive 2011/83/EU). You lose the right to cancel the contract once the minting starts.

## Gas Fees & The "Green Eye" Risk

Users are solely responsible for all network gas fees ("Transaction Costs").

**Non-Refundable:** Gas fees are paid to network validators, not to the Protocol. They are **never refundable**, even if a transaction fails or is reverted.

**Network and delivery costs:** The last mint initiates asynchronous processing. Consult the actual gas estimate and final oracle/CCIP fee policy; no 18× multiplier or guaranteed response time is stated.

## Allocation Claims

- **Cycle allocations:** Direct payment is attempted after promotional distribution processing. If it fails, the recorded deferred amount can be collected with `claim()`.
- **Campaigns:** Claim terms depend on the separately verified campaign implementation. The Protocol is not liable for rewards left unclaimed due to user negligence, lost private keys, or wallet disconnection.

## Technical Failures

The Protocol is not liable for transactions that fail due to:

- **User Error:** (e.g., setting gas limit too low, "Out of Gas" errors).
- **Network Issues:** (e.g., Robinhood/Base network congestion or CCIP/VRF delivery delays).
- **Slippage:** (e.g., someone else minting the last item before you).

In these cases, no refunds will be issued for gas spent or opportunities lost.
