export const convertDateFull = (date: Date): string => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}