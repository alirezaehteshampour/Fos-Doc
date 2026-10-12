import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowRight, TrendingUp, ShieldAlert, Coins, type LucideIcon } from "lucide-react";

export default function AnalysisLandingPage() {
    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
                <ReportCard
                    title="The 2025 Outlook"
                    description="Historical market projections and Base context; not Robinhood adoption data."
                    icon={TrendingUp}
                    href="/analysis/market-2025"
                    color="text-blue-500"
                />
                <ReportCard
                    title="Online Giveaways"
                    description="Analysis of the 'Transparency Gap' and broken state of current sweepstakes."
                    icon={ShieldAlert}
                    href="/analysis/giveaways"
                    color="text-rose-500"
                />
                <ReportCard
                    title="Protocol Economics"
                    description="Comparative analysis of Platform 'Take Rates' vs. Autonomous Protocol Efficiency."
                    icon={Coins}
                    href="/analysis/economics"
                    color="text-emerald-500"
                />
            </div>

            <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 text-white border-0">
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Executive Summary</h2>
                    <div className="space-y-4 text-slate-300">
                        <p>
                            The digital collectibles market is projected to grow from <strong>$21B to $211B</strong> by 2030, driven by a shift from speculation to utility.
                            Brands are increasingly adopting automated reward ecosystems to replace legacy loyalty programs.
                        </p>
                        <p>
                            <strong>FOS Protocol</strong> addresses the transparency gap in the $37B affiliate and sweepstakes market by leveraging
                            <strong> Robinhood Chain</strong> for user transactions and the specified Base VRF/CCIP flow for randomness. Pool contribution fractions are collection-specific: 95%, 97%, and 98%; they are not individual returns.
                        </p>
                    </div>
                    <div className="mt-6">
                        <Link href="/analysis/market-2025" className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium">
                            Start Reading Report <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
}

function ReportCard({ title, description, icon: Icon, href, color }: { title: string; description: string; icon: LucideIcon; href: string; color: string }) {
    return (
        <Link href={href} className="block group">
            <GlassCard className="h-full hover:border-blue-500/30">
                <div className={`mb-4 ${color}`}>
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{description}</p>
                <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-blue-500">
                    View Data <ArrowRight className="ml-1 w-3 h-3" />
                </div>
            </GlassCard>
        </Link>
    );
}
