import { createMDX } from 'fumadocs-mdx/next';
import { basePath } from './site.config.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath,
    reactStrictMode: true,
    output: 'standalone', // Enable for Docker deployment
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    devIndicators: {
        appIsrStatus: false,
        buildActivity: false,
    },
    async redirects() {
        return [
            { source: '/analysis/market-2025', destination: '/analysis/market', permanent: true },
            { source: '/docs/market-insights/market-2025', destination: '/docs/market-insights/market', permanent: true },
        ];
    },
    async headers() {
        return [{
            source: '/whitepaper.pdf',
            headers: [
                { key: 'Content-Type', value: 'application/pdf' },
                { key: 'Content-Disposition', value: 'inline; filename="FOS-Whitepaper.pdf"' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
            ],
        }];
    },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
