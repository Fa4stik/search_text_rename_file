const specSym = ['%', '.', '/', '!']

export const validateName = (name: string): boolean => {
    if (name.length === 0 || Array.from(name).some(char => specSym.includes(char)))
        return false
    return true;
}