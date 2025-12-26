import ChartRegistry from "@/components/charts/chart-registry";
import { AnalysisNav } from "@/components/analysis-nav";
import Link from "next/link";
import Image from "next/image";

export default function AnalysisLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
            <ChartRegistry />

            {/* Header with logo */}
            <header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="FOS Logo"
                            width={32}
                            height={32}
                            className="rounded-lg"
                        />
                        <span className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                            FOS
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Docs
                        </Link>
                        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            Home
                        </Link>
                    </div>
                </div>
            </header>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">FOS Market Intelligence</h1>
                    <p className="text-muted-foreground">Q4 2025 Strategic Report Series</p>
                </header>

                <AnalysisNav />

                <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {children}
                </main>

                <footer className="mt-20 pt-8 border-t border-border text-center text-muted-foreground text-sm">
                    <p>© 2025 FOS Protocol • Market Research Division</p>
                </footer>
            </div>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-[100px]" />
            </div>
        </div>
    );
}
