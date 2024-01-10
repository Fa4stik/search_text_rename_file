import {TRow} from "../../../05_entities/DataGrid";
import {TImage} from "../../../05_entities/CreateTaskForm";

const areaSizes = {
    '0': ' кб.',
    '5000': ' мб.',
    '5120000': ' гб.'
}

export const convertSize = (files: TImage[]) => {
    try {
        const commonSize = files.reduce(
            (acc, value) => (acc+=value.image!.size), 0)/1024

        const areaKeys = Object.keys(areaSizes)

        for (let i = 0; i < areaKeys.length; i++) {
            if (commonSize < Number.parseInt(areaKeys[i]))
                return Math.floor(commonSize/Math.pow(1024, i-1)) +
                    areaSizes[areaKeys[i-1] as keyof typeof areaSizes]
        }

        return Math.floor(commonSize/Math.pow(1024, areaKeys.length-1)) +
            areaSizes[areaKeys.at(-1) as keyof typeof areaSizes]
    } catch (e) {
        return 'Неопределенно'
    }
}