with open('original_site.html', encoding='utf-8') as f:
    text = f.read()

import re

# Find sections
sections = re.findall(r'<section[^>]*id=\"([^\"]+)\"[^>]*class=\"([^\"]+)\"', text)
print('Sections found:', sections)

# Find all headings with classes
headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', text, re.DOTALL)
for h in headings:
    cleaned = re.sub(r'<[^>]+>', ' ', h).strip()
    if cleaned and len(cleaned) < 80:
        print('Heading:', cleaned)
