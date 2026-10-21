export function formatBudget(budget) {
  if (!budget) return 'N/A';
  return budget;
}

export function truncateText(text, maxLen = 150) {
  if (!text || text.length <= maxLen) return text;
  return text.slice(0, maxLen) + '...';
}

export function resultToText(obj, indent = 0) {
  // Recursively convert a result object to readable plain text for copying
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) {
    return obj.map((item, i) => {
      if (typeof item === 'string') return `${' '.repeat(indent)}• ${item}`;
      if (typeof item === 'object') return resultToText(item, indent + 2);
      return `${' '.repeat(indent)}• ${String(item)}`;
    }).join('\n');
  }
  if (typeof obj === 'object') {
    return Object.entries(obj)
      .map(([key, val]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        if (typeof val === 'string' || typeof val === 'number') {
          return `${' '.repeat(indent)}${label}: ${val}`;
        }
        return `${' '.repeat(indent)}${label}:\n${resultToText(val, indent + 2)}`;
      }).join('\n\n');
  }
  return String(obj);
}
