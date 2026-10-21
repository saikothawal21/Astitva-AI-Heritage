import os
import re

MAPPINGS = {
    r'\bbg-white\b': 'bg-white dark:bg-stone-900',
    r'\bbg-stone-50\b': 'bg-stone-50 dark:bg-stone-800',
    r'\bbg-stone-100\b': 'bg-stone-100 dark:bg-stone-800',
    r'\bborder-stone-100\b': 'border-stone-100 dark:border-stone-800',
    r'\bborder-stone-200\b': 'border-stone-200 dark:border-stone-700',
    r'\bborder-stone-300\b': 'border-stone-300 dark:border-stone-600',
    r'\btext-stone-800\b': 'text-stone-800 dark:text-stone-100',
    r'\btext-stone-700\b': 'text-stone-700 dark:text-stone-200',
    r'\btext-stone-600\b': 'text-stone-600 dark:text-stone-300',
    r'\btext-stone-500\b': 'text-stone-500 dark:text-stone-400',
    r'\btext-stone-400\b': 'text-stone-400 dark:text-stone-500',
    r'\bbg-heritage-50\b': 'bg-heritage-50 dark:bg-heritage-900/30',
    r'\bbg-heritage-100\b': 'bg-heritage-100 dark:bg-heritage-900/40',
    r'\btext-heritage-900\b': 'text-heritage-900 dark:text-heritage-100',
    r'\btext-heritage-800\b': 'text-heritage-800 dark:text-heritage-200',
    r'\btext-heritage-700\b': 'text-heritage-700 dark:text-heritage-300',
    r'\bbg-blue-50\b': 'bg-blue-50 dark:bg-blue-950',
    r'\bbg-blue-100\b': 'bg-blue-100 dark:bg-blue-900/40',
    r'\bborder-blue-100\b': 'border-blue-100 dark:border-blue-800',
    r'\btext-blue-900\b': 'text-blue-900 dark:text-blue-100',
    r'\btext-blue-800\b': 'text-blue-800 dark:text-blue-200',
    r'\bbg-amber-50\b': 'bg-amber-50 dark:bg-amber-950',
    r'\bborder-amber-200\b': 'border-amber-200 dark:border-amber-800',
    r'\btext-amber-800\b': 'text-amber-800 dark:text-amber-200',
    r'\bbg-red-50\b': 'bg-red-50 dark:bg-red-950',
    r'\bborder-red-200\b': 'border-red-200 dark:border-red-800',
    r'\btext-red-800\b': 'text-red-800 dark:text-red-200',
    r'\btext-red-600\b': 'text-red-600 dark:text-red-400',
    r'\bbg-emerald-100\b': 'bg-emerald-100 dark:bg-emerald-900/40',
    r'\btext-emerald-800\b': 'text-emerald-800 dark:text-emerald-200',
    r'\bhover:bg-stone-300\b': 'hover:bg-stone-300 dark:hover:bg-stone-600',
    r'\bhover:bg-stone-100\b': 'hover:bg-stone-100 dark:hover:bg-stone-800',
    r'\bhover:bg-red-100\b': 'hover:bg-red-100 dark:hover:bg-red-900/40',
    r'\bhover:text-red-600\b': 'hover:text-red-600 dark:hover:text-red-400',
    r'\bhover:border-heritage-400\b': 'hover:border-heritage-400 dark:hover:border-heritage-600',
    r'\bhover:bg-stone-50\b': 'hover:bg-stone-50 dark:hover:bg-stone-800',
    r'\bshadow-sm\b': 'shadow-sm dark:shadow-stone-950/50',
    r'\bbg-white/90\b': 'bg-white/90 dark:bg-stone-900/90',
    r'\bdivide-stone-200\b': 'divide-stone-200 dark:divide-stone-700',
    r'\bbg-emerald-50/20\b': 'bg-emerald-50/20 dark:bg-emerald-950/20',
    r'\bbg-blue-50/20\b': 'bg-blue-50/20 dark:bg-blue-950/20',
}

files = [
    r"C:\Users\sande\.gemini\antigravity\scratch\astitva-ai-module\client\src\pages\ImageAnalyzerPage.jsx",
    r"C:\Users\sande\.gemini\antigravity\scratch\astitva-ai-module\client\src\pages\TripPlannerPage.jsx",
    r"C:\Users\sande\.gemini\antigravity\scratch\astitva-ai-module\client\src\pages\ComparatorPage.jsx"
]

def process_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    for pattern, replacement in MAPPINGS.items():
        # Only replace if we haven't already replaced it (simple check: if replacement already in text, be careful, but these are unique enough except bg-stone-200)
        # We need a function to ensure we don't duplicate
        def replacer(match):
            m = match.group(0)
            if replacement in content:
                return m # rough check, let's just do standard substitution and fix dupes
            return replacement
        content = re.sub(pattern, replacement, content)

    # Clean up any potential duplicates like 'bg-white dark:bg-stone-900 dark:bg-stone-900'
    content = re.sub(r'(dark:[a-zA-Z0-9/-]+)\s+\1', r'\1', content)

    # Special case for bg-stone-200 (buttons). It's tricky to distinguish. I'll replace all bg-stone-200.
    content = re.sub(r'\bbg-stone-200\b(?! dark:)', 'bg-stone-200 dark:bg-stone-700', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Processed {filepath}")

for file in files:
    process_file(file)
