#!/usr/bin/env python3
"""Check publication artifacts, current links, economic arithmetic, and AI reference freshness."""
from pathlib import Path
from decimal import Decimal
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'content/docs'

# Prior editions remain in Git history, with no public archive or historical routes.
assert not (ROOT/'public/archive').exists(), 'Historical downloads must not be published'
assert not (DOCS/'archive_legacy').exists(), 'Historical documentation must not be published'
assert (ROOT/'public/whitepaper.tex').read_bytes() == (ROOT/'whitepaper/whitepaper.tex').read_bytes()

current = [p for p in DOCS.rglob('*.mdx') if 'archive_legacy' not in p.parts]

# Preserve the original language policy while allowing existing policy exclusions,
# historical research, and exact Solidity identifiers inside code spans.
baseline = 'fffadfefd38eea1bb3b39cfaeabd77f89c7f9bf5'
baseline_files = set(subprocess.check_output(['git', 'ls-tree', '-r', '--name-only', baseline], cwd=ROOT, text=True).splitlines())
restricted = re.compile(r'\b(?:lottery|lotteries|lotto|gambling|gamble|igaming|bet|betting|wager|tickets?|win|wins|winners?|winning|prizes?|jackpot|payouts?)\b', re.I)

def prose(text):
    return re.sub(r'```.*?```|`[^`]+`', '', text, flags=re.S)

for file in current:
    relative = file.relative_to(ROOT).as_posix()
    original = subprocess.check_output(['git', 'show', f'{baseline}:{relative}'], cwd=ROOT, text=True) if relative in baseline_files else ''
    approved = {line.strip() for line in prose(original).splitlines() if restricted.search(line)}
    for line in prose(file.read_text()).splitlines():
        if restricted.search(line):
            assert line.strip() in approved, f'New restricted product wording in {relative}: {line}'

assert not restricted.search(prose((ROOT/'whitepaper/whitepaper.md').read_text())), 'Restricted vocabulary in current whitepaper prose'
assistant = (ROOT/'src/app/api/chat/route.ts').read_text()
for preferred in ['Fos Digital Collectible', 'promotional', 'recipient', 'allocation', 'loyalty reward']:
    assert preferred in assistant, f'Missing original AI vocabulary guidance: {preferred}'
for file in current:
    for slug in re.findall(r'\]\((/docs[^)#?\s]*)', file.read_text()):
        relative = slug.removeprefix('/docs').strip('/')
        assert (DOCS/(relative+'.mdx')).is_file() or (DOCS/relative/'index.mdx').is_file(), (file,slug)

knowledge_text=(ROOT/'src/lib/fos-knowledge.ts').read_text()
knowledge=json.loads(knowledge_text.split('export const FOS_KNOWLEDGE_BASE = ',1)[1].strip().removesuffix(';'))
for relative in ['protocol/index.mdx','protocol/platform.mdx','protocol/mechanics.mdx','referral.mdx','technical/verification-contract.mdx','protocol/community.mdx']:
    body=re.sub(r'^---\n.*?\n---\n','',(DOCS/relative).read_text(),count=1,flags=re.S).strip()
    assert body in knowledge, f'Stale AI reference: {relative}'

for relative in ['protocol/mechanics.mdx','market-insights/economics.mdx']:
    text=(DOCS/relative).read_text()
    for name, price, bps, expected_pool, expected_admin in [
        ('Buddy',3,500,1425,60),('Samurai',13,300,6305,130),('Noble',25,200,12250,125),
    ]:
        price=Decimal(price)
        cut=price*Decimal(bps)/10000
        contribution=price-cut
        assert 500*contribution == expected_pool
        assert 495*cut-5*contribution == expected_admin
        assert 495*price == expected_pool+expected_admin
        assert f'${expected_pool:,}' in text, (relative,name,'incorrect pool')
        assert f'${contribution:.2f}' in text, (relative,name,'incorrect contribution')

pdf_text=subprocess.check_output(['pdftotext',str(ROOT/'public/whitepaper.pdf'),'-'],text=True)
for term in ['Robinhood','CCIP','pendingWithdrawals','getStatus','6,305','12,250','50%','60%','82%']:
    assert term in pdf_text, f'Missing PDF rule: {term}'
assert not restricted.search(pdf_text), 'Restricted product vocabulary in rendered current PDF'
page=(DOCS/'whitepaper.mdx').read_text()
assert '<WhitepaperViewer />' in page and '/archive/' not in page
assert "withBasePath('/whitepaper.pdf')" in (ROOT/'src/components/whitepaper-viewer.tsx').read_text()
assert '/archive/' not in pdf_text and 'original-facsimile' not in pdf_text

manifest=json.loads((ROOT/'docs/research/2026-10-20/manifest.json').read_text())
for source in manifest['sources']:
    assert hashlib.sha256((ROOT/source['snapshot']).read_bytes()).hexdigest() == source['sha256'], source['id']
research=(DOCS/'market-insights/market.mdx').read_text()
for source in manifest['sources']:
    assert source['url'] in research, f'Missing research citation: {source["id"]}'
assert '6180753054346818345' in research and '46630' in research
assert not (ROOT/'src/app/analysis/market-2025').exists()

print(f'PASS: {len(current)} current documentation pages have valid links; historical routes/downloads are removed.')
print('PASS: downloadable LaTeX equality, current PDF rules, AI reference, economic conservation, and research provenance.')
print('PASS: current product vocabulary follows Git history; exact technical names and original policy/research context are preserved.')
