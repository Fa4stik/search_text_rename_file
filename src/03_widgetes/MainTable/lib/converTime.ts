const areaTimes = {
    '0': ' сек.',
    '60': ' мин.',
    '3600': ' час.'
}

export const convertTime = (commonTime: number): string => {
    const areaKeys = Object.keys(areaTimes);

    for (let i = 0; i < areaKeys.length; i++) {
        if (commonTime < Number.parseInt(areaKeys[i]))
            return Math.floor(commonTime/Math.pow(60, i-1)) +
                areaTimes[areaKeys[i-1] as keyof typeof areaTimes]
    }

    return Math.floor(commonTime/Math.pow(60, areaKeys.length-1)) +
        areaTimes[areaKeys.at(-1) as keyof typeof areaTimes]
}