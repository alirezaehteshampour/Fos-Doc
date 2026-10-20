import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: { files: ['**/*.mdx', '!archive_legacy/**'] },
  meta: { files: ['**/meta.json', '!archive_legacy/**'] },
});

export default defineConfig();
