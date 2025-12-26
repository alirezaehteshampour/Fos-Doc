"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { UniversalChart } from "@/components/charts/universal-chart";
import { ChartData } from "chart.js";

// -- Data from Marketing3.md --

const inputRevenue = 1000;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const protocolDataPoints: number[] = [];
const centralizedDataPoints: number[] = [];

for (let i = 0; i < 12; i++) {
    protocolDataPoints.push(inputRevenue * (i + 1) * 0.95);
    centralizedDataPoints.push(inputRevenue * (i + 1) * 0.50);
}

const valueData: ChartData<"line"> = {
    labels: months,
    datasets: [
        {
            label: 'Autonomous Protocol (95% Return)',
            data: protocolDataPoints,
            borderColor: '#06b6d4',
            backgroundColor: 'rgba(6, 182, 212, 0.1)',
            fill: true,
            tension: 0.4
        },
        {
            label: 'Centralized Platform (50% Return)',
            data: centralizedDataPoints,
            borderColor: '#94a3b8',
            backgroundColor: 'rgba(148, 163, 184, 0.1)',
            fill: true,
            tension: 0.4,
            borderDash: [5, 5]
        }
    ]
};

const costBreakdownData: ChartData<"doughnut"> = {
    labels: ['Community Rewards', 'Platform Overhead', 'Marketing/Admin'],
    datasets: [{
        label: 'Centralized Model',
        data: [50, 20, 30],
        backgroundColor: ['#94a3b8', '#fb7185', '#fbbf24'],
    }]
};

const fosBreakdownData: ChartData<"doughnut"> = {
    labels: ['Community Rewards', 'Protocol Burn', 'Ops/Gas'],
    datasets: [{
        label: 'FOS Model',
        data: [95, 4, 1],
        backgroundColor: ['#34d399', '#06b6d4', '#475569'],
    }]
};


export default function EconomicsPage() {
    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">Protocol vs. Platform Economics</h2>
                <p className="text-muted-foreground mt-2">How autonomous code eliminates rent-seeking and maximizes community value.</p>
            </div>

            {/* Main Value Chart */}
            <GlassCard className="p-8">
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground">Cumulative Value Returned ($)</h3>
                    <p className="text-muted-foreground text-sm">Comparison based on $1,000 monthly volume input.</p>
                </div>
                <div className="h-80">
                    <UniversalChart type="line" data={valueData} />
                </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-8">
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Cost Structure: Centralized</h3>
                    <div className="h-64 relative">
                        <UniversalChart type="doughnut" data={costBreakdownData} options={{ cutout: '60%' }} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-muted-foreground">50%</span>
                        </div>
                    </div>
                    <p className="text-center mt-4 text-sm font-medium text-rose-500">High Operational Drag</p>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Cost Structure: FOS Protocol</h3>
                    <div className="h-64 relative">
                        <UniversalChart type="doughnut" data={fosBreakdownData} options={{ cutout: '60%' }} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-3xl font-bold text-emerald-500">95%</span>
                        </div>
                    </div>
                    <p className="text-center mt-4 text-sm font-medium text-emerald-600">Maximized Efficiency</p>
                </GlassCard>
            </div>

            <GlassCard className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 border-slate-700 text-white">
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-cyan-400">The "Take Rate" Revolution</h3>
                    <p className="text-slate-300">
                        Legacy platforms must extract 20-50% to cover offices, salaries, and sales teams.
                        FOS operates as immutable code on Base L2, reducing marginal costs to near-zero.
                        This creates an insurmountable economic moat against centralized competitors.
                    </p>
                </div>
            </GlassCard>
        </div>
    );
}
