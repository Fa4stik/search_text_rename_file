export const convertNameFile = (fileName: string, limit = 35): string => {
    const idExt = fileName.split('').lastIndexOf('.')
    return fileName.length > limit
        ? fileName.slice(0, limit-5) + '... .' + fileName.slice(idExt+1)
        : fileName
}