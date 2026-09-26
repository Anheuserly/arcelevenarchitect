import re

# 1. Update HTML footer
html_path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.html'
with open(html_path, 'r') as f:
    html = f.read()

html = html.replace('Spaces shaped by light, proportion and lived rhythm.', 'designing eclectic spaces')

with open(html_path, 'w') as f:
    f.write(html)

# 2. Update CSS for font and brand-mark size
css_path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.css'
with open(css_path, 'r') as f:
    css = f.read()

# Update .brand-name font
css = re.sub(
    r'\.brand-name\s*\{[^}]*\}',
    '.brand-name {\n  font-family: Inter, "Helvetica Neue", Arial, sans-serif;\n  font-size: 15.5pt;\n  line-height: 1;\n  letter-spacing: .7px;\n  font-weight: 700;\n  text-transform: uppercase;\n}',
    css
)

# Update .brand-mark size (the one I appended at the end has width: 24mm; height: 24mm;)
css = css.replace('width: 24mm;\n  height: 24mm;', 'width: 72mm;\n  height: 24mm;')

with open(css_path, 'w') as f:
    f.write(css)

