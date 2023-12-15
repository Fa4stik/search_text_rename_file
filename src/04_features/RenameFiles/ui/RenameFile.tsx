import React, {useEffect, useState} from 'react';
import {GridHeader} from "../../GridHeader";
import {ESizes} from "../../GridHeader/model/sizes";
import {FillButton} from "../../../06_shared/ui/button";
import {TRow} from "../../../05_entities/DataGrid";
import {useParams} from "react-router-dom";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {convertDateFull} from "../../../05_entities/MainPage";
import {addFileName, getPermatags, rmPermatag, setPermatag} from "../../../05_entities/RenameFileFetchData";
import {validateName} from "../../CreateTask";
import {TagGroup} from "../../../05_entities/RenameFiles";

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

    const [permaTags, setPremaTags] = useState<string[]>([])
    const [isNotCorrectName, setIsNotCorrectName] = useState<boolean>(false)

    useEffect(() => {
        getPermatags()
            .then(resp => {
                setPremaTags(resp.tags)
            })
            .catch(err => console.log(err))
    }, []);

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
        setNameFile(prevState =>
            prevState === ''
                ? tag
                : prevState + ` ${tag}`
        )
    };

    const handleDelTag = (e: React.MouseEvent<SVGSVGElement>, tag: string) => {
        e.stopPropagation()
        rmPermatag(tag)
            .then(resp => {
                setPremaTags(prevState => prevState.filter(myTag => myTag !== tag))
            })
    }

    const handleBlurTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPermatag(e.target.value)
            .then(resp => resp)
    }

    return (
        <div className="w-full h-full flex flex-col py-[10px] px-[30px] overflow-y-scroll">
            <div className="flex flex-col mb-[10px]">
                <h3 className="text-xl mb-[5px]">Тэги</h3>
                {/*<TagGroup name={'Общие'}*/}
                {/*          tags={tags}*/}
                {/*          handleClickTag={handleClickTag}*/}
                {/*          isShowTags*/}
                {/*/>*/}
                {/*<TagGroup name={'Пользователя'} tags={permaTags}*/}
                {/*          handleClickTag={handleClickTag}*/}
                {/*          handleDelTag={handleDelTag}*/}
                {/*          handleBlurTag={handleBlurTag}*/}
                {/*          setTags={setPremaTags}*/}
                {/*          isAddTag*/}
                {/*          isDeleteTag*/}
                {/*/>*/}
                <TagGroup name={'Названия'} tags={['АК', 'БЦ']}
                          handleClickTag={handleClickTag}
                          handleDelTag={handleDelTag}
                          handleBlurTag={handleBlurTag}
                          setTags={setPremaTags}
                          isAddTag
                          isDeleteTag
                />
                <TagGroup name={'Масштабы'} tags={['1к200', '1к500']}
                          handleClickTag={handleClickTag}
                          handleDelTag={handleDelTag}
                          handleBlurTag={handleBlurTag}
                          setTags={setPremaTags}
                          isAddTag
                          isDeleteTag
                />
                <TagGroup name={'Даты'}
                          tags={['11.12.2023']}
                          handleClickTag={() => console.log()}
                          isShowTags
                />
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
                <div className="flex gap-x-1">
                    <FillButton onClick={handleSetNameFile}
                                classStyles={`${isNotCorrectName ? 'bg-red-400' : 'bg-mainGreen'} rounded-md`}
                    >
                        Изменить
                    </FillButton>
                    <FillButton onClick={(e) => {
                        e.preventDefault()
                        setNameFile('')
                    }}
                                classStyles="rounded-md bg-mainDark"
                    >
                        Очистить
                    </FillButton>
                </div>
            </div>
        </div>
    );
};