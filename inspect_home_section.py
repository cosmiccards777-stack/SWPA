with open('original_site.html', encoding='utf-8') as f:
    text = f.read()

import re

m = re.search(r'class=\"[^\"]*swpa-branded-home[^\"]*\"[^>]*>(.*?)</section>', text, re.DOTALL)
if m:
    content = m.group(1)
    print("Found swpa-branded-home content, length:", len(content))
    with open('swpa_home_section.html', 'w', encoding='utf-8') as out:
        out.write(content)
    # print first 1500 chars
    print(content[:1500])
else:
    print("Could not find swpa-branded-home")
