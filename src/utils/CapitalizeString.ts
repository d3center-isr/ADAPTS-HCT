/**
 * Returns a version of the inputted string with the first character capitalized (if possible)
 * @param s {string} String to capitalize
 */
export function capitalize(s: string) {
    return [s.toLocaleUpperCase()[0], s.slice(1)].join('');
}