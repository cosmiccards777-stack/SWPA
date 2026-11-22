import urllib.request
import re

req = urllib.request.Request('https://swpamerch.uk/checkout', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as r:
    html = r.read().decode('utf-8', errors='ignore')
    chunks = re.findall(r'/_next/static/chunks/[^"\']+', html)
    print('Chunks count:', len(chunks))
    for c in chunks[:5]:
        print(c)
