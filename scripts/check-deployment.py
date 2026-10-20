#!/usr/bin/env python3
"""Validate a running docs deployment, including its /document asset boundary."""
from pathlib import Path
import argparse
import concurrent.futures
import json
import urllib.request
import urllib.error

ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser()
parser.add_argument('url', help='Documentation mount, e.g. http://127.0.0.1:3010/document')
args=parser.parse_args()
base=args.url.rstrip('/')

def read(path):
    with urllib.request.urlopen(base+path,timeout=30) as response:
        return response.status,response.headers,response.read(),response.url

routes=['/','/analysis','/analysis/market','/analysis/giveaways','/analysis/economics']
for file in (ROOT/'content/docs').rglob('*.mdx'):
    slug=file.relative_to(ROOT/'content/docs').with_suffix('').as_posix()
    if slug.endswith('/index'):slug=slug[:-6]
    if slug=='index':slug=''
    routes.append('/docs'+('/'+slug if slug else ''))

def check_page(path):
    status,headers,data,url=read(path)
    assert status==200 and 'text/html' in headers.get('Content-Type','') and len(data)>1000,path
    assert '/document/document/' not in data.decode(),path

with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(check_page,routes))

for name,mime in [('whitepaper.pdf','application/pdf'),('whitepaper.tex',None),('logo.png','image/png'),('favicon.png','image/png')]:
    status,headers,data,url=read('/'+name)
    assert status==200 and data==(ROOT/'public'/name).read_bytes(),name
    if mime:assert mime in headers.get('Content-Type',''),(name,headers)
    if name.endswith('.pdf'):assert data.startswith(b'%PDF-') and 'inline' in headers.get('Content-Disposition','')

_,_,index,_=read('/api/search')
json.loads(index)
assert b'Robinhood' in index and b'archive_legacy' not in index and b'Historical documentation' not in index

for path in ['/archive/whitepaper-2025.pdf','/docs/archive_legacy/whitepaper','/docs/archive_legacy/technical/index']:
    try:read(path)
    except urllib.error.HTTPError as error:assert error.code==404,(path,error.code)
    else:raise AssertionError('Historical content is still served: '+path)

for path in ['/analysis/market-2025','/docs/market-insights/market-2025']:
    status,_,_,url=read(path)
    assert status==200 and url.endswith('/market'),(path,url)

print(f'PASS: {len(routes)} current pages; exact PDF/LaTeX/image assets; PDF MIME/disposition; current-only search; removed-history 404s; research redirects.')
