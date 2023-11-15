const specSym = ['\\', '/', ':', '?', '"', '<', '>', '|']
const specName = ["NUL", "COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7",
    "COM8", "COM9", "LPT1", "LPT2", "LPT3", "LPT4", "LPT5", "LPT6", "LPT7", "LPT8", "LPT9"]

export const validateName = (name: string): boolean => {
    if (name.length === 0 || Array.from(name).some(char => specSym.includes(char)))
        return false
    return specName.includes(name)
        ? false
        : true
}