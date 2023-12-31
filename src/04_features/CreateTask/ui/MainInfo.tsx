import React, {useEffect, useState} from 'react';
import {BorderInput} from "../../../06_shared/ui/input";
import {BorderSelect} from "../../../06_shared/ui/select";
import {TOption} from "../../../06_shared/model/typeSelect";
import {getOcrModels} from "../../../05_entities/FetchOCR";

type MainInfoProps = {
    changeNameTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsLocalPath: React.Dispatch<React.SetStateAction<boolean>>
    setCurrModel: React.Dispatch<React.SetStateAction<string>>
    isNotCorrect?: boolean;
}

const optionsFiles: TOption[] = [
    {key: 'Локальные файлы', value: 1},
    {key: 'Путь на сервере', value: 2},
]

export const MainInfo:
    React.FC<MainInfoProps> = ({changeNameTask,
         setIsLocalPath,
                               setCurrModel,
                               isNotCorrect}) => {

    const [optionsModels, setOptionsModels] =
        useState<TOption[]>([{key: 'загрузка моделей...', value: 1}])

    useEffect(() => {
        getOcrModels().then(resp => {
            setOptionsModels(resp.models.map((model, id) =>
                ({key: model, value: id})))
            setCurrModel(resp.models.at(-1) ?? 'None')
        })
            .catch(err => console.log(err))
    }, []);

    const handleChangeFiles = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLocalPath(e.target.value === '1' ? true : false)
    };

    const handleChangeModel = (e: React.ChangeEvent<HTMLSelectElement>, model?: string) => {
        setCurrModel(model ?? 'None')
    };

    return (
        <div className="flex gap-x-[15px]">
            <BorderInput placeholder={"Название задачи..."}
                         onChange={changeNameTask}
                         classStyle={`w-1/2 text-lg`}
                         inlineStyles={{
                             borderColor: isNotCorrect ? 'rgb(239 68 68)' : ''
                         }}
            />
            <BorderSelect options={optionsFiles}
                          onChange={handleChangeFiles}
                          classStyle="flex-grow"
                          defaultValue={1}
            />
            <BorderSelect options={optionsModels}
                          onChange={handleChangeModel}
                          classStyle="flex-grow"
                          defaultValue={3}
            />
        </div>
    );
};