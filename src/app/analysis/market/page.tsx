import { source } from '@/lib/source';
import { DocsBody } from 'fumadocs-ui/page';
import components from 'fumadocs-ui/mdx';

export default function ResearchPage() {
    const page = source.getPage(['market-insights', 'market']);
    if (!page) throw new Error('Missing canonical research page');
    const Body = page.data.body;
    return <DocsBody><Body components={components} /></DocsBody>;
}
