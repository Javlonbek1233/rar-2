/**
 * Numbers are formatted using local-specific grouping.
 * E.g., 1000000 -> "1,000,000" or space separated format
 */
export function formatNumber(num: number | undefined): string {
  if (num === undefined || isNaN(num)) return '0';
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Formats country land area in square kilometers.
 */
export function formatArea(area: number | undefined): string {
  if (area === undefined || isNaN(area)) return '0 km²';
  return `${new Intl.NumberFormat('en-US').format(area)} km²`;
}

/**
 * Clean joining utility for arrays of strings (e.g. capitals, languages)
 */
export function formatList(list: string[] | undefined, fallback = 'N/A'): string {
  if (!list || list.length === 0) return fallback;
  return list.join(', ');
}
