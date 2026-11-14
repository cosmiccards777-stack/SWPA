import re

with open('original_site.html', encoding='utf-8') as f:
    html = f.read()

# Extract title
title_m = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
print('Title:', title_m.group(1) if title_m else 'No title')

# Extract all images
img_srcs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html)
print('Total images found:', len(img_srcs))
print('Sample images:')
for s in img_srcs[:15]:
    print(' ', s)

# Find banner / hero
print('\n--- Banner / Text content ---')
banner_texts = re.findall(r'<div[^>]*banner[^>]*>(.*?)</div>', html, re.DOTALL | re.IGNORECASE)
for b in banner_texts[:5]:
    clean = re.sub(r'<[^>]+>', ' ', b).strip()
    if clean:
        print('Banner text snippet:', clean[:200])

# Find headings
for tag in ['h1', 'h2', 'h3', 'p']:
    matches = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html, re.DOTALL | re.IGNORECASE)
    cleaned = [re.sub(r'<[^>]+>', ' ', m).strip() for m in matches if re.sub(r'<[^>]+>', ' ', m).strip()]
    if cleaned:
        print(f'\n--- {tag.upper()} ({len(cleaned)}) ---')
        for c in cleaned[:6]:
            print(' *', c)

# Check colors in CSS or style tags
styles = re.findall(r'--color-[^:]+:[^;]+;', html)
print('\n--- Shopify CSS variables ---')
for st in styles[:15]:
    print(st)
