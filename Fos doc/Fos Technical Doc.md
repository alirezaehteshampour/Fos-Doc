
📘 Tech Doc

Project: **PROJECT NAME**
Version: v0.1 (Draft)

Toggle ThemeExpand All

#### Contents

[Executive Summary](https://fos.ooo/internal_docs/full_document.php#executive-summary)[Objectives](https://fos.ooo/internal_docs/full_document.php#objectives)[Non-Goals](https://fos.ooo/internal_docs/full_document.php#non-goals)[System Overview](https://fos.ooo/internal_docs/full_document.php#system-overview)[Architecture](https://fos.ooo/internal_docs/full_document.php#architecture)[Components](https://fos.ooo/internal_docs/full_document.php#components)[Network Choice: Base](https://fos.ooo/internal_docs/full_document.php#network-choice-base)[Smart Contracts](https://fos.ooo/internal_docs/full_document.php#smart-contracts)[Contract Suite Overview](https://fos.ooo/internal_docs/full_document.php#contract-suite-overview)[Three-Pool Architecture (Single Contract)](https://fos.ooo/internal_docs/full_document.php#three-pool-architecture-single-contract)[Common Standards &amp; Interfaces](https://fos.ooo/internal_docs/full_document.php#common-standards-interfaces)[Global Assumptions](https://fos.ooo/internal_docs/full_document.php#global-assumptions)[Reward Distribution Contract](https://fos.ooo/internal_docs/full_document.php#reward-distribution-contract)[Referral Contract](https://fos.ooo/internal_docs/full_document.php#referral-contract)[Verification Contract](https://fos.ooo/internal_docs/full_document.php#verification-contract)[Free Mint Contract](https://fos.ooo/internal_docs/full_document.php#free-mint-contract)[Campaign (Incentive Layer): Reward Pool / Leaderboard Contract](https://fos.ooo/internal_docs/full_document.php#campaign-incentive-layer-reward-pool-leaderboard-contract)[Observability, Testing &amp; Assurance](https://fos.ooo/internal_docs/full_document.php#observability-testing-assurance)[Landing Website](https://fos.ooo/internal_docs/full_document.php#landing-website)[Purpose &amp; Structure](https://fos.ooo/internal_docs/full_document.php#purpose-structure)[Tech Stack](https://fos.ooo/internal_docs/full_document.php#tech-stack)[Previews and CTAs](https://fos.ooo/internal_docs/full_document.php#previews-and-ctas)[Performance &amp; SEO](https://fos.ooo/internal_docs/full_document.php#performance-seo)[Main Application](https://fos.ooo/internal_docs/full_document.php#main-application)[Authentication](https://fos.ooo/internal_docs/full_document.php#authentication)[App Pages](https://fos.ooo/internal_docs/full_document.php#app-pages)[Integrations](https://fos.ooo/internal_docs/full_document.php#integrations)[Core App (core/index.php)](https://fos.ooo/internal_docs/full_document.php#core-app-core-index-php)[Infrastructure &amp; DevOps](https://fos.ooo/internal_docs/full_document.php#infrastructure-devops)[Security &amp; Compliance](https://fos.ooo/internal_docs/full_document.php#security-compliance)[APIs &amp; Data Models](https://fos.ooo/internal_docs/full_document.php#apis-data-models)[Endpoints](https://fos.ooo/internal_docs/full_document.php#endpoints)[Schemas](https://fos.ooo/internal_docs/full_document.php#schemas)[Testing &amp; QA](https://fos.ooo/internal_docs/full_document.php#testing-qa)[Roadmap](https://fos.ooo/internal_docs/full_document.php#roadmap)[Glossary &amp; References](https://fos.ooo/internal_docs/full_document.php#glossary-references)[FAQ](https://fos.ooo/internal_docs/full_document.php#faq)

# Technical Documentation

v0.1 (Draft)Audience: Engineering, Product, SecurityScope: Architecture, Contracts, Web App, Ops

## Executive Summary

This document provides a comprehensive, technical overview of  **PROJECT NAME** , covering smart contracts, the public landing website, and the main application. It is intended to be sufficiently detailed to form the basis of the project's whitepaper and related external documentation.

### Objectives

* Define the end-to-end architecture and component responsibilities.
* Describe minting, whitelisting, and reward distribution mechanics.
* Explain security posture, operational processes, and testing strategy.

### Non-Goals

* Legal or tokenomics advisory beyond technical mechanisms.
* Marketing materials or visual brand guidelines.

## System Overview

### Architecture

The system comprises on-chain smart contracts, a public-facing landing site, and an authenticated main application. Off-chain services provide indexing, allowlist generation, and analytics. The architecture is modular to enable independent deployment and upgrades.

### Components

* **Smart Contracts** : Core token/NFT logic, whitelist verification, free-mint enforcement, and reward settlement.
* **Landing** : Public marketing and interaction entry point with whitelist, free mint initiation, and reward discovery.
* **Main App** : User dashboard, claims, admin controls, and operational tooling.
* **Off-chain Services** : Allowlist generation (e.g., Merkle trees), notifications, data indexing, and analytics.

### Network Choice: Base

* **Why Base?** Lower gas fees, high throughput, and robust L2 security inherit from Ethereum while providing a smoother UX.
* **Innovation** : We introduce a novel reward distribution/referral construct on Base with no direct analogue among existing projects at time of writing.
* **Exploration & Analytics** : We read and verify transactions/events from `BaseScan` for user receipts, reward tracking, and diagnostics.

## Smart Contracts

### Contract Suite Overview

* **Reward Distribution** : User participation that awards/mints an NFT per purchase and registers purchasers for reward distribution outcomes.
* **Referral** : Handles a fixed $10 payment and revenue split (82% referrer, 18% admin) when a valid referral is present; otherwise 100% to admin.
* **Verification** : Canonical on-chain registry to verify whether a project NFT is officially verified.
* **Free Mint** : Scheduled, allowlisted free mint with a special early-user allocation (configurable) of higher-value NFTs.
* **Reward Pool / Leaderboard** : Accrues revenue upon activation threshold and pays out 50/30/20 to top-3 leaderboard at defined milestones.

### Three-Pool Architecture (Single Contract)

The core protocol implements three distinct pools within a single reward distribution/mint contract. Pools are isolated logically and accounted separately; a `poolType` (e.g., enum) indicates the active pool for each mint and distribution.

* **Body** : Entry ~$3, Reward $1,000
* **Samurai** : Entry ~$12, Reward $5000
* **Noble** : Entry ~$25, Reward $10,000

Per-pool state tracks purchasers, dedicated pool balances, and distribution outcomes. Events include the `poolType` to enable precise indexing/analytics.

#### Per-Pool Recipients & Distribution

* **Recipients per pool** : 17 total — 1 (first), 6 (second tier), 10 (third tier).
* **Split** : 50% to first place, 30% split equally among 6 recipients, 20% split equally among 10 recipients.
* All accounting is pool-scoped, preventing cross-pool mixing of balances or rewards.

### Common Standards & Interfaces

* Tokens: **ERC-721** (current deployment). `ERC-1155` remains optional only if multiple classes are needed. Use OpenZeppelin implementations with `Ownable` or `AccessControl`.
* Payments: `ERC-20` stablecoin or native currency (TBD). All transfers use safe patterns and check return values.
* Access Control: Admin and Operator roles. Admin is multi-sig where possible; time-locked changes for sensitive parameters.
* Upgradeability: Transparent/UUPS proxies (if chosen) via audited libraries; otherwise immutable for reduced attack surface.

### Global Assumptions

* All external calls are wrapped with checks-effects-interactions and `nonReentrant` guards where value transfer occurs.
* Monotonic parameters (e.g., supply caps) never increase after deployment unless governed via timelocked admin process.
* Events are emitted for every state change that impacts accounting, access control, minting, verification, and distributions.

### Reward Distribution Contract

Allows users to purchase Fos Digital Collectibles wherein each eligible purchase results in minting/awarding an NFT and recording the user in the purchaser set for reward distributions.

#### State & Configuration

* `maxSupply`, `minted`, `baseURI`, optional `reveal` mechanics.
* `saleWindow` (start/end), per-wallet cap, per-tx cap.
* Randomness: production uses **Chainlink VRF** (subscription on Base). Test builds may use deterministic/pseudo randomness and must not be deployed to mainnet.

#### Infinite Cycle Reset

* Each pool follows a  **500-mint cycle** . Upon the **500th mint** and successful payout, the pool's minted counter resets to 0 in the  *same transaction* .
* `cycleId` increments atomically for that pool. Indexing can rely on `(poolType, cycleId, mintIndex)`.
* **Greek Numbering** : user-facing labels use 1–100 blocks; after the 500th mint, labels restart at 1.
* **The Cycle Structure:** The protocol consists of **100 Sequential Generations** (e.g., Cycle 1 to Cycle 100).
* **Per-Cycle Supply:** Each Generation contains exactly  **500 Unique NFTs** .
* **The Reset Trigger:** Upon the sale of the **500th NFT** (The Green Eye) in the current cycle:

  1. The Atomic Payout executes.
  2. The `cycleId` increments (e.g., Buddy I **$\rightarrow$** Buddy II).
  3. The `minted` counter resets to 0.
  4. The next generation becomes immediately active.
* **Clarification:** "1-100" refers to the  **Cycle Generations** , not the NFT numbering. Inside any active pool, NFTs are unique from 1 to 500.

#### Free Number Tiers

* Certain numbers (e.g.,  **10** ,  **100** ,  **200** ,  **300** ,  **400** ) are designated as free-entry tiers; users pay only network gas.
* Eligibility and "free" status are enforced on-chain; contract logic prevents fee collection for these tiers while still requiring gas.
* **Scope** : The free-number policy applies uniformly across all three pools (Body, Samurai, Noble).
* Note: While labels display 1–100 segments, free tiers 200/300/400 refer to the cycle-wide mint indices (1..500).

#### Two-Contract Architecture

* **Contract A (Payment & Mint)** : Receives user payment (per selected pool: Body/Samurai/Noble) unless a free-number tier applies, mints the NFT, delivers it to the user, and allocates the admin share as configured.
* **Contract B (Reward Distribution)** : Receives the remaining funds earmarked for the selected pool and orchestrates that pool's automated selection and reward distribution.
* The flow is non-custodial: funds are programmatically routed; the app server never takes custody.

#### Green Eye Gas Treasury (Mint #500)

* The **500th mint** includes an additional gas stipend to cover the on-chain costs of executing the batch payout for recipients (up to 18 atomic transfers as designed).
* The payer of mint #500 receives a special NFT (the  **Green Eye** ) and remains eligible to receive rewards like any other participant.
* The extra ETH is stored in a dedicated `gasStipend` variable reserved exclusively for the payout transaction(s).
* Payouts pay **17 recipients** per pool (1/6/10). If actual gas is less than the stipend, the *leftover* is forwarded to the Admin wallet per policy.
* The stipend amount follows a contract-defined policy; parameters are configurable and audited. VRF costs are handled separately via LINK subscription on Base.

#### External Interfaces

* `buyAndMint()`/`mint()`: mints an NFT for caller if within constraints; records purchaser.
* `distributeRewards()` (admin/operator): resolves recipients using VRF callback or deterministic method; awards rewards if applicable.

#### Randomness

* Recipient selection uses  **Chainlink VRF** ; random seeds are verifiable on-chain; results cannot be influenced by the team.

#### Events

* `Mint(address account, uint256 tokenId)`, `DistributionRequested(bytes32 requestId)`, `DistributionResult(uint256 round, address[] recipients)`.

#### Invariants & Security

* Never exceed `maxSupply`; per-wallet and phase caps enforced on-chain.
* Randomness is provided via Chainlink VRF; validate callback origin, manage nonces, and reject stale/duplicate fulfillments.
* Use CEI; protect mint functions with `nonReentrant`. Pause mechanism for emergency.
* No application-layer override exists to redirect funds or alter recipient results; controls are strictly contract-gated.

### Referral Contract

Processes a fixed deposit (nominally $10) and splits proceeds based on presence of a valid referral, sending 82% to referrer and 18% to admin. Without referral, 100% goes to admin.

#### State & Configuration

* `admin` payout address (multi-sig), `treasury` if distinct.
* `referrerOf[code]` mapping or `isValidReferrer[address]`; optional `code → address` registry.
* Asset configuration: native vs `ERC-20` token (address, decimals). Fixed price oracle not required since value is nominal and constant; alternatively reference USD-pegged stablecoin.

#### External Interfaces

* `payReferral(code)` or `payReferral(referrer)`: validates referral; processes split; records accounting.
* `withdraw()` (pull-based): referrers and admin withdraw accrued balances to mitigate reentrancy risk.

#### Events

* `ReferralPaid(address payer, address referrer, uint256 refAmount, uint256 adminAmount)`, `ReferralMissed(address payer, uint256 amount)`.

#### Accounting & Rounding

* Compute `refAmount = floor(amount * 82 / 100)`, `adminAmount = amount - refAmount` to avoid dust loss.
* Track per-beneficiary accruals in mappings; transfers occur via withdraw to reduce attack surface.
* **Admin routing** : The 18% admin fee is routed directly to the Admin wallet.

#### Security

* Validate referral source (signed code by backend or on-chain registry) to prevent spoofing.
* Use `nonReentrant` and CEI; never assume `ERC-20` returns `true` without checking.
* **Program Rule** : The referral program is  *linear and single-level* . Only direct referrals count; there is no multi-level/MLM structure.

### Verification Contract

Canonical registry for verifying project NFTs. Other contracts and off-chain services can query verification status.

#### State & Configuration

* `isVerified[tokenContract][tokenId]` → bool.
* Authorized verifiers: `AccessControl` role `VERIFIER_ROLE`; admin can add/remove verifiers.
* Optional immutability flag to freeze verification after set, or versioned reasons for audits.

#### External Interfaces

* `setVerified(tokenContract, tokenId, status, reason)` (verifier/admin).
* `isVerified(tokenContract, tokenId)` view function for integration.

#### Verification Methods

* **On-chain** : Integrators call `isVerified` directly.
* **API** : An internal API endpoint returns verification status for UI and services.
* **Dedicated Page** : A web page lets users paste contract/token IDs and check verification status.

#### Events & Security

* `VerificationChanged(tokenContract, tokenId, status, reason, msg.sender)`.
* Strict role gating; optional timelock for revocations; emit events for full auditability.

### Free Mint Contract

Enables a scheduled, allowlisted free mint. Early eligible wallets receive a special allocation of higher-value NFTs (configurable).

#### Whitelist & Schedule

* Allowlist via Merkle tree: leaf example `keccak256(abi.encode(wallet, quota, phaseId))`. Root stored on-chain.
* Enforce `perWalletQuota`, `perTxLimit`, and `phase` windows (`start`/`end` timestamps).
* Anti-bot: cooldowns, optional signature-based gating (`EIP-712`), and same-block mint protections.
* Schedule: start time is configured (TBD) via config keys and will be finalized closer to launch.

#### Early Allocation

* Parameters: `earlyAdoptersCount` (e.g., 10), `rewardPerAdopter` (e.g., 10 NFTs), `rewardTier` (e.g., $100 tier).
* Selection: first `N` distinct wallets successfully minting after phase start. Deterministic tie-break by transaction ordering.
* Guarantees: ensure rewards do not exceed supply; track `awarded[wallet]` to prevent double-allocation.

#### Interfaces & Events

* `mintFree(proof, quota, phaseId)`: validates Merkle proof; mints; applies early allocation if eligible.
* Events: `FreeMintStarted(phaseId)`, `FreeMinted(wallet, qty, phaseId)`, `EarlyAllocation(wallet, qty, tier)`.

#### Security

* Merkle root rotation requires admin; proofs validated with exact leaf structure and domain separation by `phaseId`.
* Pause and supply guardrails; `nonReentrant` on minting pathways.
* **Immutability & Fairness** : Free-mint eligibility and allocation are enforced entirely by the contract; operators cannot "hand-pick" or alter outcomes.

### Campaign (Incentive Layer): Reward Pool / Leaderboard Contract

Activated when total users reach 5,000. For one month, site revenue is funneled to the pool. Upon hitting milestones ($20k, $50k, $100k, $200k, $500k, $1M, $2M), distribute 50/30/20 to top three accounts on the leaderboard.

#### Activation & Funding

* Activation condition: `usersCount ≥ 5000` (fed from an oracle or admin-set flag accompanied by evidence).
* Funding source: on-chain revenues from the **Referral** contract (admin share of $10 payments) and the **Reward Distribution** contract (admin share of purchases), funneled into the reward pool.
* Accrual window: `activationTime` to `activationTime + 30 days`. Post-window, continue accrual toward next milestones as configured.

#### Milestones & Distribution

* Milestones: 20k, 50k, 100k, 200k, 500k, 1M, 2M (configurable). On crossing each, a distribution is triggered.
* Leaderboard source: on-chain accumulation or an oracle feed from the main app. Snapshot height defined and immutable per milestone.
* Split: 1st 50%, 2nd 30%, 3rd 20%. Rounding: allocate remainder to admin or largest rank deterministically to prevent dust drifting.
* Distribution method: claim-based recommended — write allocations, users call `claim()`; prevents reentrancy and failed transfer halts.

This is a  **temporary growth campaign** . The core protocol (Body/Samurai/Noble pools, distributions, and protocol payouts) continues indefinitely regardless of campaign status. The campaign share of each mint is routed **directly** to a dedicated campaign vault and can be turned off without affecting the 500-mint cycles.

#### Interfaces & Events

* `recordRevenue(amount)`: called by revenue wallet or adapter; updates pool and checks milestones.
* `setLeaders(milestone, addresses[3])` (admin/oracle): freezes recipients for that milestone.
* `claim(milestone)`: eligible leaders withdraw their allocation; idempotent via claimed flags.
* Events: `RevenueAdded(amount)`, `MilestoneReached(milestone, pool)`, `LeadersSet(milestone, first, second, third)`, `Claimed(milestone, account, amount)`.

#### Security & Invariants

* Multi-sig admin for parameter changes; milestone leader sets logged and immutable after confirmation.
* Pool accounting must be conserved: sum(allocations at milestone) ≤ poolAtMilestone; any remainder handled deterministically.
* Use `nonReentrant`, CEI; avoid push transfers; support `ERC-20` safe operations.
* **Trustless Operation** : Reward accruals, leader snapshots, and claims are executed by contract rules; neither operators nor developers can alter recipients or redirect funds.

### Observability, Testing & Assurance

* Emit comprehensive events for every critical action; index via subgraph for analytics and audits.
* Testing: unit tests for each contract module; invariant tests for supply/accounting; fuzz tests for edge cases (e.g., boundary times, rounding, reentrancy).
* Static analysis: run Slither/Mythril; differential testing for randomness-dependent code where feasible.
* Deployment: if upgradeable, initialize via `initializer` functions; verify all addresses on explorer; store config in a registry.

## Landing Website

### Purpose & Structure

The landing site introduces the product, previews key application modules (Whitelist, Free Mint, Rewards), and routes users into the app. It includes sections such as feature highlights, whitelist teaser, and reward/milestones preview with CTAs to the corresponding app pages.

### Tech Stack

* Server-rendered PHP templates with shared styles and components.
* Client-side JS enhances interactivity and integrates wallet connectors where needed.
* Calls internal APIs for dynamic counters and previews.

### Previews and CTAs

* Whitelist preview linking to `/app/whitelist.php` with requirement highlights.
* Free Mint preview linking to `/app/FreeMint.php` with countdown teaser.
* Rewards preview linking to `/app/rewards.php` showing pool/milestones overview.

### Performance & SEO

* Static content where possible; defer non-critical scripts; cache API previews.
* Structured metadata, social cards, and Core Web Vitals monitoring.

## Main Application

### Authentication

Wallet-based authentication and gating for on-chain interactions. OAuth is used for social verifications on the Whitelist page (X/Twitter, Discord) and Telegram/YouTube checks. Sessions are minimal; client performs most flows with API verification.

### App Pages

#### Whitelist Page

Users connect wallet and complete social steps to qualify. The page reads dynamic requirements from the database and enforces unique social accounts per user as configured.

* **Path** : `/app/whitelist.php`
* **Requirements (dynamic)** : loaded from table `data`, e.g. `require_twitter`, `require_discord`, `require_youtube`, `require_youtube_subscribe`, `require_telegram_join`, `enforce_unique_socials`, `require_base_transaction`, `base_rpc_url`, `oauth_allowed_origins`.
* **Settings** : `whitelist_settings` table for capacity and toggle; `whitelist_users` stores registrations.
* **Social Connections** :
* X/Twitter OAuth: popup via `/api/oauth_twitter.php`/`includes/config/oauth.php`; scopes include `users.read`.
* Discord OAuth: popup via `/api/oauth_discord.php` callbacks; scope `identify`.
* YouTube: OAuth client configured via `data` keys (`youtube_oauth_client_id`, `youtube_channel_id`); subscription check if enabled.
* Telegram: Join-and-verify flow using bot token and channel id/username via `/api/telegram_verify.php`.
* **API** : `/api/whitelist_handler.php` validates inputs against dynamic flags and persists registration; enforces Base transaction requirement if enabled.
* **Security** : restrict popup message origins via `oauth_allowed_origins`; rate-limit submissions; enforce one wallet per set of socials if `enforce_unique_socials` is true.

#### Free Mint Page

Whitelist users see a countdown and can mint when the window opens. Configuration and eligibility checks are performed through APIs and the `data` table.

* **Path** : `/app/FreeMint.php`
* **Config** (`data` table): `freemint_start_unix` or `freemint_start_iso`, `freemint_nft_price_usd`, `freemint_max_per_user`.
* **Eligibility** : calls `/api/whitelist_handler.php?action=check_wallet&wallet=...` to validate whitelist membership before enabling mint.
* **Click/Claim Queue** : `/api/freemint_click.php` maintains `free_mint_state(hard_cap, claimed_count)` and `free_mint_clicks` with row locks to prevent race conditions.
* **UX** : countdown to start time; mint button enabled only if time ≥ start, wallet connected, and whitelist=true.
* **Security** : server-side locking on claims, anti-duplicate checks; later integrated with on-chain free mint contract for final settlement.

#### Rewards Page

Displays current reward pool, milestones, and recipients/leaderboard information. Integrates with API endpoints and the reward contract lifecycle.

* **Path** : `/app/rewards.php`
* **Pool Display** : shows current wallet/balance and provides copy/view explorer actions.
* **Milestones** : renders configured thresholds (e.g., 20k→2M) and status.
* **Leaderboard** (JS in `core/index.php`):
  * Totals: `/api/leaderboard_handler.php?action=get_total_users` updates the 5,000-user activation progress.
  * Leaderboard data: `/api/leaderboard_handler.php?action=get_leaderboard&period=day|week|all&page=...` with pagination.
  * Recipients modal: dynamically renders recipients and reward amounts when available.
* **Security** : sanitize API outputs, cache and rate-limit leaderboard endpoints; avoid exposing sensitive admin data.

#### Landing Page (App Shell)

* Provides navigation to Whitelist, Free Mint, and Rewards pages with shared header/footer and styles.
* Hides or reveals CTAs contextually depending on page and user state (e.g., wallet connection).

### Integrations

* Wallet connectors for Base network; RPC URL configurable via `data.base_rpc_url`.
* OAuth providers for X/Twitter, Discord, YouTube; Telegram Bot API for membership verification.
* Internal APIs under `/api/` for whitelist, freemint, leaderboard, and telegram verification.
* **Explorer** : Read transaction data and receipts from `BaseScan` for user-facing confirmations and admin diagnostics.
* **VRF** : Chainlink VRF is funded via **LINK subscription** on Base. User checks rely on `msg.sender` (not `tx.origin`) for Account Abstraction compatibility.

### Core App (core/index.php)

This is the main single-page application shell. It manages navigation, wallet connections, on-chain NFT minting and purchasing, leaderboard rendering, profile, gallery, and recipients pages. Client logic coordinates with APIs and smart contracts.

#### Routing & Navigation

* **Router** : `showPage(pageId)` toggles visibility across sections: `overviewContent`, `allCollectionsContent`, `mintNftContent`, `leaderboardContent`, `profileContent`, `recipientsContent`, `galleryContent`, `aboutContent`.
* **Menu** : sidebar listeners map to pages (Home, Profile, Collection list, Gallery, Leaderboard, Recipients, About). Returning home uses `goHome()` with context to restore previous list view.
* **Contextual UI** : CTA elements (e.g., "Mint Now") are shown on the overview and hidden on subpages; overlays adjust based on wallet state (e.g., profile overlay when disconnected).

#### Wallet Connections

* **MetaMask** : `connectMetaMask()` requests accounts, updates localStorage (`walletConnected`, `currentAccount`, `lastConnectionTime`), then invokes `registerOrLoginUser`, `loadProfileData`, `checkRecipientStatus`.
* **Coinbase** : `connectCoinBase()` uses CoinbaseWalletSDK; provider targets Base Sepolia (id 84432). Event listeners handle `accountsChanged`, `chainChanged`, and `disconnect`.
* **Auto-restore** : `checkAllWalletConnections()` attempts restoration within 24h by checking `eth_accounts` or Coinbase SDK; on success rehydrates profile and status.
* **UX** : gallery/profile refresh after connect; overlays prompt connection when required.

#### Live ETH Price (USD)

* Fetch live ETH/USD price from a reliable API and display it in the UI for user context.
* Values are informational; on-chain logic remains source of truth. Base network gas costs are reflected in wallet prompts.

#### NFT Minting & Purchase

* **Entry** : "Mint Now" resolves `selectedCollectionType` then navigates to `mintNftContent`. If no wallet, shows wallet-required overlay.
* **On-chain mint** : Using `ethers.js`, calls contract `buyAndMint(collectionType, tokenURI, { value: collectionPrice })`. The `tokenURI` is derived from selected collection metadata; `collectionPrice` is fetched via `collectionPrices(collectionType)`.
* **Persistence** : Upon confirmation, saves transaction via API (wallet, tx hash, token id/URI, type, amount), increments sold NFTs and user mint counters, updates UI and opens success modal.
* **State** : Maintains `currentCollectionData`, `selectedCollectionType`; provides helpers like `setRandomNft()` for display.
* **VRF** : Reward distributions are resolved with Chainlink VRF; randomness is verifiable and tamper-resistant.

#### Leaderboard & Recipients

* **Leaderboard** : `loadLeaderboardData(period, page)` calls `/api/leaderboard_handler.php?action=get_leaderboard` to populate podium (top 3) and paginated list; supports periods (day, month, year) and pagination state.
* **Grand reward progress** : `updateGrandRewardProgress()` fetches total users via API and updates the 5,000-user activation bar.
* **Recipients** : Modal and recipients page render recent recipients and reward info; UI helpers format and paginate the view.
* **Points System** :
* Each valid referral: **+1** point.
* Collection purchase  **$3** : **+2** points.
* Collection purchase  **$13** : **+4** points.
* Collection purchase  **$25** : **+6** points.

#### Profile & Gallery

* **Profile** : Loads data via `/api/profile_handler.php?wallet_address=...` to update username/avatar; tabs include invited friends, transactions, and settings; referral card is shown when a link exists.
* **Gallery** : Displays user's NFTs; initialized when opening gallery with a connected wallet.

#### APIs & Data Flow

* **Transactions** : Saved post-mint via transaction handler API (wallet, tx hash, NFT details, amount).
* **Leaderboard** : `/api/leaderboard_handler.php` for podium/list and diagnostics (test/debug endpoints).
* **Profile** : `/api/profile_handler.php` for user profile data and referral info.
* **Explorer Sync** : Periodically read and cross-check user transactions and events from `BaseScan` for transparency.

#### Security & Reliability

* **On-chain safety** : Relies on contract-side guards (CEI, `nonReentrant`, role gating). Client-side enforces wallet connection, network selection, and amount checks before submitting transactions.
* **API hygiene** : API responses are validated; lists are paginated; UI avoids blocking on transient failures and logs client-side errors.
* **Resilience** : Auto-restore wallet sessions, graceful UI fallbacks, and state refresh after critical actions. Gallery/profile auto-refresh on connect.
* **Failover (Distribution/Payout)** : If the auto-distribution at the 500th mint does not execute, a *public* retry/distribution function can be called to complete the distribution and pay recipients immediately. Payouts are push transfers; if a recipient reverts, the transaction reverts and can be retried.

#### Performance

* Defer heavy UI until navigation into a page; cache leaderboard pages client-side; minimize re-renders; lazy-load images and modals.
* Use batched API calls for leaderboard and profile where possible; throttle DOM updates when scrolling lists.

## Infrastructure & DevOps

* Environments: dev, testnet, production with dedicated RPC endpoints.
* CI/CD: automated lint, test, and deployment pipelines.
* Observability: centralized logs, metrics, uptime and error alerts.
* Secrets: managed via vaults and restricted IAM policies.

## Security & Compliance

* Threat modeling for contract and web attack surfaces.
* Key management using HSMs or hardware wallets for admin operations.
* Regular audits, fuzzing, and bug bounty programs.
* Privacy: PII minimization, data retention policies, and consent tracking.

All high-privilege transactions should be multi-sig protected and/or timelocked.

## APIs & Data Models

### Endpoints

* `GET /status`: System health and current phases.
* `POST /allowlist/proof`: Returns Merkle proof for a wallet.
* `GET /reward/:wallet`: Reward eligibility and claim status.

### Schemas

* **User** : wallet, roles, preferences.
* **Mint** : tx hash, phase, amount, timestamp.
* **Reward** : tier, allocation, claimedAt, tx hash.

## Testing & QA

* Smart contracts: unit tests, invariant tests, coverage reports.
* Web: integration and e2e tests across critical journeys.
* Testnets: rehearsals with production-like configurations.

## Roadmap

* Alpha on testnet with whitelist-only mint.
* Public launch with free mint window and reward activation.
* Post-launch optimizations and additional utilities.

## Glossary & References

* **Merkle Proof** : Compact proof of inclusion in a set using Merkle trees.
* **Allowlist** : Curated list of eligible wallets for restricted phases.
* **VRF** : Verifiable Random Function, for auditable randomness.

References: OpenZeppelin Contracts, EIPs (ERC-20/721/1155), Chainlink VRF docs, The Graph.

## FAQ

<details open=""><summary>Why did you choose the Base network?</summary>

Base offers lower gas fees and high throughput while inheriting Ethereum's security. It improves UX and lets us deliver novel primitives not commonly available elsewhere.

</details>

<details open=""><summary>Are some collection purchases free?</summary>

Yes. Specific numbers (10, 100, 200, 300, 400) are free-entry tiers. Users only pay gas; the contracts enforce no fee for these tiers.

</details>

<details open=""><summary>How is randomness guaranteed?</summary>

We use Chainlink VRF for provably fair randomness. Results are verifiable on-chain and cannot be influenced by operators or developers.

</details>

<details open=""><summary>Can the team modify Free Mint or Reward outcomes?</summary>

No. Both flows are fully governed by smart contracts. Operators cannot re-route funds, select recipients, or change allocations beyond contract-configured parameters (often timelocked and multi-sig protected).

</details>

<details open=""><summary>How are leaderboard points calculated?</summary>

Referral: +1 point per valid referral. Collection purchase: $3 → +2, $13 → +4, $25 → +6 points.

</details>

<details open=""><summary>Is the referral program multi-level?</summary>

No. It is linear and single-level. Only your direct referrals count; there is no pyramid structure.

</details>

<details open=""><summary>How do I verify an NFT?</summary>

Three ways: call the on-chain `isVerified` function, use our verification API endpoint, or check via the dedicated verification web page.

</details>

<details open=""><summary>Do I need social connections for the whitelist?</summary>

Yes. The whitelist page enforces connecting your wallet and completing required social verifications (Twitter, Discord, YouTube, Telegram) as configured.

</details>

<details open=""><summary>Where do prices and transaction data come from?</summary>

ETH/USD prices are fetched from a reliable price API for display only. Transaction data and receipts are read from BaseScan to enhance transparency.

</details>

<details open=""><summary>Do free-entry tiers still require gas?</summary>

Yes. Even for free tiers (10/100/200/300/400), users must pay network gas. Gas is paid to validators and is not collected by us.

</details>

<details open=""><summary>Which wallets and networks are supported?</summary>

MetaMask and Coinbase Wallet are supported on the Base network. The app prompts network switching to Base when needed.

</details>

<details open=""><summary>How are admin funds handled?</summary>

Admin shares are routed by contract to designated wallets (preferably multi-sig). Sensitive parameter changes can be timelocked as configured.

</details>

<details open=""><summary>What if Chainlink VRF is delayed or fails?</summary>

The contract logic re-requests or defers resolution until a valid VRF response arrives. There is no manual override to inject custom randomness.

</details>

<details open=""><summary>How are NFT metadata and reveal handled?</summary>

Metadata follows `baseURI` conventions. If a reveal phase exists, it is executed via contract-controlled parameters; final URIs are immutable post-reveal.

</details>

<details open=""><summary>How are referrals validated and abuse prevented?</summary>

Referrals are validated via signed codes or an on-chain registry. Rate limits and uniqueness checks mitigate abuse; only direct referrals are counted.

</details>

<details open=""><summary>How do I receive rewards if I'm selected as a recipient?</summary>

For the main collections (Body/Samurai/Noble), rewards are sent **automatically** to your wallet when the 500th NFT is minted. No claim action is required. For the Growth Campaign Leaderboard rewards, you must manually claim your allocation using the `claim(milestone)` function (the UI provides a one-click flow). A small gas fee is required for campaign claims.

</details>

<details open=""><summary>Can I independently verify my purchases and claims?</summary>

Yes. All purchases and reward claims emit events. You can verify them on BaseScan and cross-check with the contract state.

</details>

Cycle Reset `<details open=""><summary>`How are leaderboard ties resolved?`</summary>`

Ties are broken deterministically according to snapshot rules (e.g., earlier on-chain activity at the snapshot height). Rules are consistent and logged.

</details>

<details open=""><summary>What happens if I switch wallets?</summary>

Ownership and points are wallet-based. Switching wallets creates a new account context; previous purchases/referrals do not automatically transfer.

</details>

<details open=""><summary>Is any part of the system custodial?</summary>

No. Funds for purchases, rewards, and referrals are routed by smart contracts. Servers do not take custody of user funds.

</details>

<details open=""><summary>Why might the displayed ETH price differ from my wallet's quote?</summary>

Displayed prices are informational and may lag or use different sources. Your wallet and on-chain values remain the source of truth at transaction time.

</details>

© 2025 PROJECT NAME — Internal Technical Documentation

This is a living document. Update version and sections as the project evolves.
