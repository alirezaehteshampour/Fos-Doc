// Public deployment prefix. Set NEXT_PUBLIC_BASE_PATH="" for a root deployment.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? '/document').replace(/\/+$/, '');
if (basePath && (!basePath.startsWith('/') || basePath.startsWith('//') || /[?#]/.test(basePath))) {
    throw new Error('NEXT_PUBLIC_BASE_PATH must be an absolute path such as /document');
}

/** @param {string} path */
export function withBasePath(path) {
    if (!basePath || !path.startsWith('/') || path.startsWith('//')) return path;
    if (path === basePath || path.startsWith(`${basePath}/`)) return path;
    return `${basePath}${path}`;
}

/** @param {string} path */
export function withoutBasePath(path) {
    if (basePath && (path === basePath || path.startsWith(`${basePath}/`))) {
        return path.slice(basePath.length) || '/';
    }
    return path;
}
