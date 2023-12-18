export const validateDate = (value: string): string =>
    value.replace(/[^0-9]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\.\d{2})(\d)/, '$1.$2')
        .slice(0, 8)