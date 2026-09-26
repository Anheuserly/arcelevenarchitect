import re

css_path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.css'
with open(css_path, 'r') as f:
    css = f.read()

# Make letterhead left side wider
css = css.replace('grid-template-columns: 1fr 1fr;', 'grid-template-columns: 1.6fr 1fr;')

# Make logo smaller but keep 3:1 ratio
css = css.replace('width: 72mm;\n  height: 24mm;', 'width: 48mm;\n  height: 16mm;')

# Prevent wrapping on brand name and tagline
css = re.sub(
    r'\.brand-name\s*\{([^}]*)\}',
    r'.brand-name {\1  white-space: nowrap;\n}',
    css
)

css = re.sub(
    r'\.brand-tagline\s*\{([^}]*)\}',
    r'.brand-tagline {\1  white-space: nowrap;\n}',
    css
)

with open(css_path, 'w') as f:
    f.write(css)

html_path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.html'
with open(html_path, 'r') as f:
    html = f.read()

html = html.replace('Architecture · Interiors · Project Delivery', 'Architecture · Interior Design · Master Planning · Project Management')

with open(html_path, 'w') as f:
    f.write(html)
