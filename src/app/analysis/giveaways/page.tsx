"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { UniversalChart } from "@/components/charts/universal-chart";
import { ChartData } from "chart.js";

// -- Data from mrketing2.md --

const trustData: ChartData<"doughnut"> = {
    labels: ['Distrust Process', 'Trust Process'],
    datasets: [{
        data: [68, 32],
        backgroundColor: ['#fb7185', '#334155'],
        borderWidth: 0,
        hoverOffset: 4
    }]
};

const fearsData: ChartData<"bar"> = {
    labels: [
        "Nepotism / Friend Wins",
        "Fake/Bot Accounts",
        "Ghost Giveaway",
        "Hidden Terms",
        "Data Mining"
    ],
    datasets: [{
        label: '% of Users Concerned',
        data: [82, 76, 65, 54, 48],
        backgroundColor: '#f43f5e',
        borderRadius: 4,
    }]
};

const automationData: ChartData<"pie"> = {
    labels: ["Manual (Excel/Random)", "Software (Opaque)", "Blockchain (Verifiable)"],
    datasets: [{
        data: [65, 20, 15],
        backgroundColor: ['#475569', '#64748b', '#34d399'],
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)'
    }]
};

const frictionData: ChartData<"radar"> = {
    labels: ['Ease of Use', 'Transparency', 'Speed', 'Low Cost', 'Mobile UX'],
    datasets: [{
        label: 'Web2 Legacy',
        data: [90, 20, 80, 95, 90],
        borderColor: '#94a3b8',
        backgroundColor: 'rgba(148, 163, 184, 0.2)',
        pointBackgroundColor: '#94a3b8'
    }, {
        label: 'Std Web3',
        data: [30, 100, 60, 40, 50],
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        pointBackgroundColor: '#f43f5e'
    }, {
        label: 'FOS (Mint-to-Participate)',
        data: [75, 100, 85, 70, 80],
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        pointBackgroundColor: '#22d3ee'
    }]
};

const funnelData: ChartData<"bar"> = {
    labels: ["Email Sign Up (Web2)", "Connect Wallet (Web3)", "Sign Transaction", "Claim Reward"],
    datasets: [{
        label: '% User Drop-off Rate',
        data: [15, 65, 55, 72],
        backgroundColor: [
            '#34d399',
            '#fb7185',
            '#fb7185',
            '#fb7185'
        ],
        indexAxis: 'y',
    }]
};

export default function GiveawaysPage() {
    return (
        <div className="space-y-8">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground">The State of Online Giveaways</h2>
                <p className="text-muted-foreground mt-2">Why 68% of users distrust traditional sweepstakes and how Web3 solves it.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Row 1: The Problem */}
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">The "Trust Gap"</h3>
                    <div className="h-64">
                        <UniversalChart type="doughnut" data={trustData} options={{ cutout: '70%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">User Sentiment towards Brand Giveaways</p>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Top User Fears</h3>
                    <div className="h-64">
                        <UniversalChart type="bar" data={fearsData} options={{ indexAxis: 'y' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Why users hesitate to participate</p>
                </GlassCard>

                {/* Row 2: The Cause */}
                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">The "Automation Gap"</h3>
                    <div className="h-64">
                        <UniversalChart type="pie" data={automationData} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">Current Technology Stack Prevalence</p>
                </GlassCard>

                <GlassCard>
                    <h3 className="text-lg font-semibold text-foreground mb-4">The Solution: UX Comparison</h3>
                    <div className="h-64">
                        <UniversalChart type="radar" data={frictionData} options={{ scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">FOS combines Web2 ease with Web3 transparency</p>
                </GlassCard>
            </div>

            {/* Full Width */}
            <GlassCard>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-foreground">The Friction Problem</h3>
                    <p className="text-sm text-muted-foreground">Traditional Web3 onboarding kills conversion. FOS streamlines this.</p>
                </div>
                <div className="h-72">
                    <UniversalChart type="bar" data={funnelData} options={{ indexAxis: 'y' }} />
                </div>
            </GlassCard>
        </div>
    );
}
