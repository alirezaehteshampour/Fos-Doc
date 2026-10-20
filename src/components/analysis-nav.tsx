"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, PieChart, TrendingUp, LayoutDashboard } from "lucide-react";
import { withoutBasePath } from '../../site.config.mjs';

const navItems = [
    {
        title: "Overview",
        href: "/analysis",
        icon: LayoutDashboard,
    },
    {
        title: "Market Research",
        href: "/analysis/market",
        icon: TrendingUp,
    },
    {
        title: "Giveaways & Trust",
        href: "/analysis/giveaways",
        icon: PieChart,
    },
    {
        title: "Economics",
        href: "/analysis/economics",
        icon: BarChart3,
    },
];

export function AnalysisNav() {
    const pathname = withoutBasePath(usePathname());

    return (
        <nav className="flex flex-wrap justify-center gap-1 bg-card/50 dark:bg-card/30 backdrop-blur-md border border-border p-1 rounded-2xl shadow-lg mb-8 mx-auto w-fit">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
