export const formatBytes = (bytes:number | null, locale=navigator.language) => {
    if (!bytes) return;

    const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte'];

    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const value = bytes / Math.pow(1024, i);
    
    const convert = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: units[i],
        unitDisplay: 'short', // or 'long', 'narrow'
        maximumFractionDigits: 2, // Adjust as needed
    })

    return convert.format(value)
}
