import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

const withMDX = createMDX();

export default withMDX(nextConfig);
