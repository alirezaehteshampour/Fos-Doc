import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

// Custom components for blockchain documentation
const customComponents: MDXComponents = {
    // Contract address component
    ContractAddress: ({ address, network = 'mainnet' }: { address: string; network?: string }) => (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border font-mono text-sm">
            <span className="text-muted-foreground">{network}:</span>
            <code className="text-primary">{address}</code>
        </div>
    ),
    // Warning/caution callout for security notices
    SecurityNotice: ({ children, type = 'warning' }: { children: ReactNode; type?: 'warning' | 'danger' | 'info' }) => {
        const styles: Record<string, string> = {
            warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-200',
            danger: 'border-red-500/50 bg-red-500/10 text-red-200',
            info: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
        };
        const icons: Record<string, string> = {
            warning: '⚠️',
            danger: '🚨',
            info: 'ℹ️',
        };
        return (
            <div className={`p-4 rounded-lg border-l-4 my-4 ${styles[type]}`}>
                <span className="mr-2">{icons[type]}</span>
                {children}
            </div>
        );
    },
    // Smart contract function signature
    FunctionSignature: ({ name, params, returns }: { name: string; params: string; returns?: string }) => (
        <div className="font-mono text-sm p-3 rounded-lg bg-muted/30 border my-2">
            <span className="text-purple-400">function</span>{' '}
            <span className="text-yellow-400">{name}</span>
            <span className="text-muted-foreground">({params})</span>
            {returns && (
                <>
                    <span className="text-purple-400"> returns </span>
                    <span className="text-green-400">({returns})</span>
                </>
            )}
        </div>
    ),
};

export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        ...customComponents,
        ...components,
    };
}
