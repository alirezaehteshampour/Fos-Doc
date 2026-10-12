"use client";

import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { UniversalChart } from '@/components/charts/universal-chart';
import type { ChartData } from 'chart.js';

const splitData: ChartData<'bar'> = {
    labels: ['Buddy', 'Samurai', 'Noble'],
    datasets: [
        { label: 'Pool contribution (%)', data: [95, 97, 98], backgroundColor: '#34d399' },
        { label: 'Admin fee (%)', data: [5, 3, 2], backgroundColor: '#fb7185' },
    ],
};

export default function EconomicsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold">FOS Collection Economics</h2>
                <p className="text-muted-foreground mt-2">
                    Collection-specific fees and funded free positions on Robinhood Chain.
                </p>
            </div>
            <GlassCard>
                <h3 className="text-xl font-semibold mb-4">Per-ticket contribution</h3>
                <div className="h-80">
                    <UniversalChart type="bar" data={splitData} options={{ scales: { y: { beginAtZero: true, max: 100 } } }} />
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                    These percentages describe the mint payment split, not individual investment returns.
                    Network gas and Base VRF/CCIP costs are separate.
                </p>
            </GlassCard>
            <GlassCard>
                <h3 className="text-xl font-semibold mb-4">Full-round nominal accounting</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead><tr><th>Collection</th><th>495 buyer payments</th><th>500-ticket pool</th><th>Remaining admin funds</th></tr></thead>
                        <tbody>
                            <tr><td>Buddy</td><td>$1,485</td><td>$1,425</td><td>$60</td></tr>
                            <tr><td>Samurai</td><td>$6,435</td><td>$6,305</td><td>$130</td></tr>
                            <tr><td>Noble</td><td>$12,375</td><td>$12,250</td><td>$125</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-muted-foreground mt-4">
                    FOSNFT funds positions 10, 100, 200, 300, and 400 from reserved balances.
                    The pool and remaining admin funds equal purchase inflow before operating costs.
                    Dollar values are model arithmetic; on-chain prices and balances use ETH.
                </p>
            </GlassCard>
            <GlassCard>
                <h3 className="text-xl font-semibold mb-2">Independent referral plans</h3>
                <p className="text-muted-foreground">
                    The direct referrer’s active $2/$5/$10 plan sets a 50%/60%/82% share of a registration
                    or upgrade payment. Upgrades pay the current price difference. These receipts are
                    independent of the round pools and do not change ticket selection weights.
                </p>
                <Link href="/docs/market-insights/economics" className="inline-block mt-4 underline">
                    Read the accounting assumptions and reserve rules
                </Link>
            </GlassCard>
        </div>
    );
}
