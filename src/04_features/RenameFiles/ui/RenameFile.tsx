import React from 'react';
import {GridHeader} from "../../GridHeader";
import {ESizes} from "../../GridHeader/model/sizes";
import {FillButton} from "../../../06_shared/ui/button";
import {TRow} from "../../../05_entities/DataGrid";

type RenameFileProps = {
    setRows: React.Dispatch<React.SetStateAction<TRow[]>>
    tags: string[]
}

export const RenameFile:
    React.FC<RenameFileProps> = ({setRows,
                                 tags}) => {
    const handleSetNameFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    return (
        <div className="w-1/3 h-full flex flex-col py-[20px] px-[30px]
                    border-solid border-r-[2px] border-r-mainDark">
            <h2 className="text-2xl mb-[10px]">Изменение название файла</h2>
            <div className="flex flex-col mb-[10px]">
                <h3 className="text-xl mb-[5px]">Тэги</h3>
                <GridHeader sorted filters search size={ESizes.XL}/>
                <div className="flex flex-wrap flex-grow border-[2px]
                            border-solid border-mainDark rounded-b-3xl p-[10px] gap-[5px]">
                    {tags.map((tag, id) => (
                        <p key={id} className="bg-mainTags/[0.3] py-[2px] px-[7px]
                                    rounded-full cursor-pointer">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
            <div className="flex flex-col flex-grow items-start">
                <h3 className="text-xl mb-[5px]">Название файла</h3>
                <textarea name="" id="" placeholder="Новое название файла..."
                          className="mb-[10px] rounded-2xl border-[2px] py-[5px] px-[10px]
                                      border-solid border-mainDark focus:outline-none w-full resize-none bg-transparent"
                />
                <FillButton onClick={handleSetNameFile}
                            classStyles="bg-mainGreen rounded-md"
                >
                    Изменить
                </FillButton>
            </div>
        </div>
    );
};