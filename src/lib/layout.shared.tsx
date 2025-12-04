import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="FOS Logo"
                        width={32}
                        height={32}
                        className="rounded-lg"
                    />
                    <span className="font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                        FOS Docs
                    </span>
                </div>
            ),
            transparentMode: 'top',
        },
        links: [
            {
                text: 'Whitepaper',
                url: '/docs/whitepaper',
            },
            {
                text: 'Smart Contracts',
                url: '/docs/smart-contracts',
            },
            {
                text: 'Platform',
                url: '/docs/platform',
            },
            {
                text: 'API',
                url: '/docs/api',
            },
        ],
        githubUrl: 'https://github.com/your-org/fos',
    };
}
