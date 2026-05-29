import os
import re

def replace_colors(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Tailwind colors
    content = re.sub(r'\bindigo-', 'amber-', content)
    content = re.sub(r'\bviolet-', 'orange-', content)
    content = re.sub(r'\bpurple-', 'yellow-', content)
    content = re.sub(r'\bcyan-', 'orange-', content)
    content = re.sub(r'\bblue-', 'yellow-', content)
    
    # rgb/rgba replacements
    if filepath.endswith('index.css') or filepath.endswith('.jsx'):
        # indigo approx to gold
        content = re.sub(r'rgba\(\s*99\s*,\s*102\s*,\s*241\s*,', 'rgba(255, 191, 0,', content)
        # violet approx to orange
        content = re.sub(r'rgba\(\s*139\s*,\s*92\s*,\s*246\s*,', 'rgba(255, 140, 0,', content)
        # teal / emerald
        content = re.sub(r'rgba\(\s*16\s*,\s*185\s*,\s*129\s*,', 'rgba(255, 215, 0,', content)
        
    with open(filepath, 'w') as f:
        f.write(content)

for root, dirs, files in os.walk('/Users/amreshanand/Documents/Resume-builder/client/src'):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css') or file.endswith('.js'):
            replace_colors(os.path.join(root, file))
