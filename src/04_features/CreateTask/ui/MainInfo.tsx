import React from 'react';
import {BorderInput} from "../../../06_shared/ui/input";
import {BorderSelect} from "../../../06_shared/ui/select";
import {TOption} from "../../../06_shared/model/typeSelect";

type MainInfoProps = {
    changeNameTask: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsLocalPath: React.Dispatch<React.SetStateAction<boolean>>
}

const options: TOption[] = [
    {key: 'Локальные файлы', value: 1},
    {key: 'Путь на сервере', value: 2},
]

export const MainInfo:
    React.FC<MainInfoProps> = ({changeNameTask,
         setIsLocalPath}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsLocalPath(e.target.value === '1' ? true : false)
    };

    return (
        <div className="flex gap-x-[15px]">
            <BorderInput placeholder={"Название задачи..."}
                         onChange={changeNameTask}
                         classStyle="w-2/3 text-lg"
            />
            <BorderSelect options={options} onChange={handleChange} classStyle="flex-grow"/>
        </div>
    );
};