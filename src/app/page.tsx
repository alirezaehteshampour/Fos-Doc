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
              Comprehensive technical documentation for the FOS blockchain platform.
              Explore our whitepaper, smart contracts, API reference, and developer guides.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
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
                Read Whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Whitepaper */}
          <Link href="/docs/whitepaper" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400 sm:w-6 sm:h-6">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Whitepaper</h3>
              <p className="text-sm text-muted-foreground">
                Executive summary, project objectives, and complete system architecture overview.
              </p>
            </div>
          </Link>

          {/* Smart Contracts */}
          <Link href="/docs/smart-contracts" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-pink-500/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-400 sm:w-6 sm:h-6">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Smart Contracts</h3>
              <p className="text-sm text-muted-foreground">
                ERC standards, minting mechanics, whitelist verification, and security patterns.
              </p>
            </div>
          </Link>

          {/* Platform */}
          <Link href="/docs/platform" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400 sm:w-6 sm:h-6">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">Platform</h3>
              <p className="text-sm text-muted-foreground">
                Landing website, authentication, dashboard modules, and admin controls.
              </p>
            </div>
          </Link>

          {/* API Reference */}
          <Link href="/docs/api" className="group">
            <div className="p-5 sm:p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-orange-500/50 transition-all duration-300 h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-orange-500/20 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400 sm:w-6 sm:h-6">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                  <polyline points="7.5 19.79 7.5 14.6 3 12" />
                  <polyline points="21 12 16.5 14.6 16.5 19.79" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">API Reference</h3>
              <p className="text-sm text-muted-foreground">
                REST endpoints, data schemas, and integration guides.
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 sm:py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-orange-400">Getting Started</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground transition-colors">Introduction</Link></li>
                <li><Link href="/docs/whitepaper" className="hover:text-foreground transition-colors">Read the Whitepaper</Link></li>
                <li><Link href="/docs/smart-contracts" className="hover:text-foreground transition-colors">Smart Contract Overview</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-pink-400">For Developers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs/api" className="hover:text-foreground transition-colors">API Reference</Link></li>
                <li><Link href="/docs/smart-contracts/standards" className="hover:text-foreground transition-colors">Contract Standards</Link></li>
                <li><Link href="/docs/infrastructure" className="hover:text-foreground transition-colors">Infrastructure</Link></li>
              </ul>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3 sm:mb-4 text-purple-400">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs/roadmap" className="hover:text-foreground transition-colors">Roadmap</Link></li>
                <li><Link href="/docs/glossary" className="hover:text-foreground transition-colors">Glossary</Link></li>
                <li><a href="https://github.com/your-org/fos" className="hover:text-foreground transition-colors">GitHub</a></li>
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
            <a href="https://github.com/your-org/fos" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
