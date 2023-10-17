export const convertNameFile = (fileName: string): string => {
    const idExt = fileName.split('').lastIndexOf('.')
    return fileName.length > 35
        ? fileName.slice(0, 30) + '... .' + fileName.slice(idExt+1)
        : fileName
}