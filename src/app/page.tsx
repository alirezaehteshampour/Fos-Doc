import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background gradient matching logo */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

        <div className="relative z-10 container mx-auto px-4 py-16 sm:py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-orange-500/40 via-pink-500/40 to-purple-500/40 rounded-full scale-150" />
                <Image
                  src="/logo.png"
                  alt="FOS Logo"
                  width={80}
                  height={80}
                  className="relative rounded-xl sm:rounded-2xl shadow-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent leading-tight">
              FOS Documentation
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              The decentralized digital collectibles platform with trustless automated rewards on Base L2.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                href="/docs"
                className="px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-pink-500/25 text-center"
              >
                Get Started
              </Link>
              <Link
                href="/docs/whitepaper"
                className="px-6 sm:px-8 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm font-semibold hover:bg-card transition-all hover:scale-105 text-center"
              >
                Whitepaper
              </Link>
              <Link
                href="/docs/market-insights"
                className="px-6 sm:px-8 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm font-semibold hover:bg-card transition-all hover:scale-105 text-center"
              >
                Market Analysis
              </Link>
              <a
                href="https://github.com/fosooo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 rounded-lg border border-border bg-card/50 backdrop-blur-sm font-semibold hover:bg-card transition-all hover:scale-105 text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Campaigns */}
          <Link href="/docs/campaigns" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Campaigns</h3>
              <p className="text-sm text-muted-foreground">
                Whitelist, Free Mint, and Growth Campaign opportunities.
              </p>
            </div>
          </Link>

          {/* Referral */}
          <Link href="/docs/referral" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-pink-500/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Referral Program</h3>
              <p className="text-sm text-muted-foreground">
                Single-level affiliate with 82% commissions.
              </p>
            </div>
          </Link>

          {/* Leaderboard */}
          <Link href="/docs/leaderboard" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Leaderboard</h3>
              <p className="text-sm text-muted-foreground">
                Community ranking and points system.
              </p>
            </div>
          </Link>

          {/* Technical */}
          <Link href="/docs/technical" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Technical Docs</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts, security, and architecture.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-orange-400">Documentation</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground transition-colors">Introduction</Link></li>
                <li><Link href="/docs/protocol" className="hover:text-foreground transition-colors">FOS Protocol</Link></li>
                <li><Link href="/docs/technical" className="hover:text-foreground transition-colors">Technical Docs</Link></li>
                <li><Link href="/docs/roadmap" className="hover:text-foreground transition-colors">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-pink-400">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link></li>
                <li><Link href="/docs/referral" className="hover:text-foreground transition-colors">Referral Program</Link></li>
                <li><Link href="/docs/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link></li>
                <li><Link href="/docs/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-purple-400">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs/whitepaper" className="hover:text-foreground transition-colors">Whitepaper</Link></li>
                <li><Link href="/docs/market-insights" className="hover:text-foreground transition-colors">Market Research</Link></li>
                <li><a href="https://github.com/fosooo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-cyan-400">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs/about" className="hover:text-foreground transition-colors">About FOS</Link></li>
                <li><Link href="/docs/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/docs/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="FOS" width={24} height={24} className="rounded" />
            <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} FOS. All rights reserved.</span>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="https://fos.ooo" className="hover:text-foreground transition-colors">fos.ooo</a>
            <a href="https://github.com/fosooo" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
