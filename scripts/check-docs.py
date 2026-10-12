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

# An accidental replacement of the historical original must fail validation.
assert hashlib.sha256((ROOT/'public/archive/whitepaper-2025.pdf').read_bytes()).hexdigest() == 'f9fb66205b5e9e118e9bb19c23e0dc74bfa0d3ad5406b8bff0c3a31dccad5898'
assert (ROOT/'public/whitepaper.tex').read_bytes() == (ROOT/'whitepaper/whitepaper.tex').read_bytes()

current = [p for p in DOCS.rglob('*.mdx') if 'archive_legacy' not in p.parts]
for file in current:
    for slug in re.findall(r'\]\((/docs[^)#?\s]*)', file.read_text()):
        relative = slug.removeprefix('/docs').strip('/')
        assert (DOCS/(relative+'.mdx')).is_file() or (DOCS/relative/'index.mdx').is_file(), (file,slug)

for file in (DOCS/'archive_legacy').rglob('*.mdx'):
    assert '**Historical documentation — superseded.**' in file.read_text(), file

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
page=(DOCS/'whitepaper.mdx').read_text()
assert 'src="/whitepaper.pdf"' in page and '/Whitepaper.pdf' not in page

print(f'PASS: {len(current)} current documentation pages have valid internal links; historical originals are labeled.')
print('PASS: original PDF hash, downloadable LaTeX equality, current PDF rules, AI reference, and economic conservation.')
