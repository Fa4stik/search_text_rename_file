export const convertNameFile = (fileName: string, limit = 35, disableDot = false): string => {
    const idExt = fileName.split('').lastIndexOf('.')
    return fileName.length > limit
        ? disableDot
            ? fileName.slice(0, limit-5) + '...'
            : fileName.slice(0, limit-5) + '... .' + fileName.slice(idExt+1)
        : fileName
}