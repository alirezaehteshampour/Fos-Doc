import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn(
                "bg-card/70 dark:bg-card/50 backdrop-blur-lg border border-border shadow-xl rounded-xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
