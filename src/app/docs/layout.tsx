import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout
            tree={source.pageTree}
            {...baseOptions()}
            sidebar={{
                banner: (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 mb-4">
                        <p className="text-xs font-medium text-primary">🚀 FOS v1.0</p>
                        <p className="text-xs text-muted-foreground">Production Ready</p>
                    </div>
                ),
            }}
        >
            {children}
        </DocsLayout>
    );
}
