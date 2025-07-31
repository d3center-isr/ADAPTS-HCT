export function capitalize(s: string) {
    return [s.toLocaleUpperCase()[0], s.slice(1)].join('');
}