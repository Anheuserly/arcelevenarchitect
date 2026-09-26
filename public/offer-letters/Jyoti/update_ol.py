import re

path = '/Volumes/HP_P500/GitHub/arcelevenarchitect/public/offer-letters/jyoti/offer-letter.css'
with open(path, 'r') as f:
    css = f.read()

# Make the signature section look nicer on page 2
css = css.replace('.signatures {\n  display: grid;', '.signatures {\n  display: grid;\n  margin-top: 10mm;')

with open(path, 'w') as f:
    f.write(css)
