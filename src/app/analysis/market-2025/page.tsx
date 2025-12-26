"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { UniversalChart } from "@/components/charts/universal-chart";
import { ChartData } from "chart.js";

// -- Data from Marketing1.md --

const growthData: ChartData<"bar" | "line"> = {
    labels: ['2023', '2024', '2025 (Proj)', '2027 (Proj)', '2030 (Proj)'],
    datasets: [
        {
            label: 'Market Size ($ Billions)',
            data: [21.4, 45.2, 82.4, 135.0, 211.7],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            order: 2
        },
        {
            label: 'Growth Trend',
            data: [21.4, 45.2, 82.4, 135.0, 211.7],
            type: 'line' as any,
            borderColor: '#06b6d4',
            borderWidth: 3,
            tension: 0.4,
            order: 1
        }
    ]
};

const loyaltyData: ChartData<"doughnut"> = {
    labels: ['Traditional Systems (Databases)', 'Web3/Blockchain Integration', 'Hybrid Models'],
    datasets: [{
        data: [55, 15, 30],
        backgroundColor: ['#94a3b8', '#3b82f6', '#06b6d4'],
        borderWidth: 0,
        hoverOffset: 4
    }]
};

const baseTrendData: ChartData<"line"> = {
    labels: ['Jan 24', 'Mar 24', 'May 24', 'Jul 24', 'Sep 24', 'Nov 24', 'Jan 25', 'Mar 25', 'May 25', 'Jul 25', 'Sep 25', 'Dec 25'],
    datasets: [{
        label: 'Daily Active Addresses (k)',
        data: [150, 210, 300, 380, 450, 520, 600, 680, 740, 790, 820, 850],
        borderColor: '#8b5cf6',
        fill: true,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4
    }]
};

const categoryData: ChartData<"polarArea"> = {
    labels: ['SocialFi', 'Gaming', 'DeFi', 'NFT/Art', 'Identity/Infra'],
    datasets: [{
        label: 'App Share',
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(6, 182, 212, 0.7)',
            'rgba(139, 92, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(100, 116, 139, 0.7)'
        ],
        borderWidth: 1
    }]
};

export default function Market2025Page() {
    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">2025 Market Outlook</h2>
                <p className="text-muted-foreground mt-2">The shift from speculation to utility in the $211B Digital Collectibles market.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Chart 1 */}
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Global NFT Market Growth</h3>
                    <div className="h-64">
                        <UniversalChart type="bar" data={growthData} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Data Source: Grand View Research / Statista</p>
                </GlassCard>

                {/* Chart 2 */}
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Loyalty Program Evolution</h3>
                    <div className="h-64">
                        <UniversalChart type="doughnut" data={loyaltyData} options={{ cutout: '70%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Projected 2025 Infrastructure Split</p>
                </GlassCard>

                {/* Chart 3 */}
                <GlassCard className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Base L2 Adoption Trend</h3>
                    <div className="h-72">
                        <UniversalChart type="line" data={baseTrendData} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Daily Active Addresses (Projected Growth)</p>
                </GlassCard>

                {/* Chart 4 */}
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Consumer App Dominance</h3>
                    <div className="h-64">
                        <UniversalChart type="polarArea" data={categoryData} options={{ scales: { r: { grid: { color: 'rgba(148, 163, 184, 0.3)' }, ticks: { display: false } } } }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Base L2 Category Share</p>
                </GlassCard>

                <GlassCard>
                    <div className="h-full flex flex-col justify-center p-4">
                        <h3 className="text-xl font-bold text-blue-500 mb-2">Key Takeaway</h3>
                        <p className="text-muted-foreground">
                            The market is maturing. Speculation is being replaced by <strong className="text-foreground">high-frequency utility</strong> (SocialFi, Gaming).
                            Base L2 is positioned as the dominant infrastructure for this consumer wave.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
