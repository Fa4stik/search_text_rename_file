import React, {useState} from 'react';
import {GridHeader} from "../../GridHeader";
import {ESizes} from "../../GridHeader/model/sizes";
import {FillButton} from "../../../06_shared/ui/button";
import {TRow} from "../../../05_entities/DataGrid";
import {useParams} from "react-router-dom";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {convertDateFull} from "../../../05_entities/MainPage";
import {addFileName} from "../../../05_entities/RenameFileFetchData";
import {validateName} from "../../CreateTask";

type RenameFileProps = {
    setRows: React.Dispatch<React.SetStateAction<TRow[]>>
    nameFile: string
    tags: string[]
    setNameFile: React.Dispatch<React.SetStateAction<string>>
    idTask?: string
    activeUid: number
}

export const RenameFile:
    React.FC<RenameFileProps> = ({setRows,
                                 tags, nameFile, setNameFile,
                                 idTask, activeUid}) => {
    const {setFileName} = useRenameStore()

    const [isNotCorrectName, setIsNotCorrectName] = useState<boolean>(false)

    const handleSetNameFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validateName(nameFile)) {
            setIsNotCorrectName(false)
            setRows(prevState => prevState.map(row =>
                row.uid === activeUid.toString()
                    ? {...row, name: nameFile, dateEdit: convertDateFull(new Date())}
                    : row
            ))
            setFileName(idTask!, activeUid, nameFile)
            addFileName(activeUid, nameFile, false).then(resp => {
                console.log('Update file name', resp)
            }).catch(err => console.log(err))
            setNameFile('')
        } else {
            setIsNotCorrectName(true)
        }
    };

    const changeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameFile(e.target.value)
    }

    const handleClickTag = (e: React.MouseEvent<HTMLParagraphElement>, tag: string) => {
        setNameFile(prevState => prevState + tag + " ")
    };

    return (
        <div className="w-full h-full flex flex-col py-[10px] px-[30px] overflow-y-scroll">
            <div className="flex flex-col mb-[10px]">
                <h3 className="text-xl mb-[5px]">Тэги</h3>
                <GridHeader sorted filters size={ESizes.XL}/>
                <div className="flex flex-wrap flex-grow border-[2px]
                            border-solid border-mainDark rounded-b-3xl p-[10px] gap-[5px] relative">
                    {tags.length > 0
                        ? tags.map((tag, id) => (
                        <p key={id} className="bg-mainTags/[0.3] py-[2px] px-[7px]
                                    rounded-full cursor-pointer"
                           onClick={(e) => handleClickTag(e, tag)}
                        >
                            {tag}
                        </p>))
                        : <p className="w-full text-center">Тегов не найдено</p>
                    }
                </div>
            </div>
            <div className="flex flex-col flex-grow items-start">
                <h3 className="text-xl mb-[5px]">Новое название файла</h3>
                <textarea name="" id="" placeholder="Новое название файла..."
                          onChange={changeTextArea}
                          value={nameFile}
                          className={`mb-[10px] rounded-2xl border-[2px] py-[5px] px-[10px] h-full min-h-[60px] max-h-[100px]
                              border-solid focus:outline-none w-full resize-none bg-transparent 
                              ${isNotCorrectName ? 'border-red-400' : 'border-mainDark'}`}
                />
                {isNotCorrectName &&
                    <p className="text-[13px] -mt-[5px] mb-[5px] ml-[10px] text-red-400">
                        *Некорректное название файла, нельзя использовать символы \ / : ? " &lt; &gt; |
                    </p>}
                <FillButton onClick={handleSetNameFile}
                            classStyles={`${isNotCorrectName ? 'bg-red-400' : 'bg-mainGreen'} rounded-md`}
                >
                    Изменить
                </FillButton>
            </div>
        </div>
    );
};