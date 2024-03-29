import React, {useEffect, useState} from 'react';
import {FillButton} from "../../../06_shared/ui/button";
import {TRow} from "../../../05_entities/DataGrid";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {convertDateFull} from "../../../05_entities/MainPage";
import {validateName} from "../../CreateTask";
import {TagGroup} from "../../../05_entities/RenameFiles";
import {delTagById, getGroupTags, getTagsByGroup, TGroupTag} from "../../../05_entities/FetchTags";
import {addFileName} from "../../../05_entities/FetchPipeline";
import {setTag} from "../../../05_entities/FetchTags";
import {validateDate} from "../lib/validateDate";
import {useNotifyStore} from "../../../05_entities/Notifications";
import {validateDuplicate} from "../lib/validateDuplicate";
import {editName} from "../../../06_shared/ui/icon";
import {useRecognize} from "../lib/useRecognize";

type RenameFileProps = {
    setRows: React.Dispatch<React.SetStateAction<TRow[]>>
    nameFile: string
    setNameFile: React.Dispatch<React.SetStateAction<string>>
    idTask?: string
    activeUid: number,
    rows: TRow[]
}

export const RenameFile: React.FC<RenameFileProps> = ({
    setRows,
    nameFile,
    setNameFile,
    idTask,
    activeUid,
    rows
}) => {

    const {setFileName} = useRenameStore()
    const {notifications, addNotification} = useNotifyStore()

    const [groupTags, setGroupTags] =
        useState<TGroupTag[]>([])
    const [errorNameFile, setErrorNameFile] =
        useState<string>('')

    const { textRecognize, isListenRecognize,
        startRecognize, stopRecognize,
        isAvailableSpeech
    } = useRecognize()

    useEffect(() => {
        getGroupTags()
            .then(groupTagsResp => {
                const tagPromises = groupTagsResp.map(gTag => !gTag.is_local
                    ? gTag.uid && getTagsByGroup(gTag.uid)
                        .then((resp): TGroupTag => ({
                            ...gTag,
                            content: resp.tags ?? []
                        }))
                        .catch(err => console.log(err))
                    : new Promise((resolve) => resolve({...gTag, uid: -1, content: []} as TGroupTag))
                );
                return Promise.all(tagPromises);
            })
            .then(groupTagsData => {
                setGroupTags(groupTagsData as TGroupTag[])
            })
            .catch(err => console.log(err));
        return () => {
            setGroupTags([])
        }
    }, []);

    const handleSetNameFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!validateName(nameFile)) {
            setErrorNameFile('Некорректное название файла, нельзя использовать символы \\ / : ? " < > |')
            return
        }

        if (!validateDuplicate(rows, nameFile)) {
            setErrorNameFile('Файл с таким названием уже существует')
            return
        }

        setErrorNameFile('')

        const typeFile = rows.find(row => row.uid === activeUid.toString())?.heirs
            ? 'file'
            : 'image'

        setRows(prevState => prevState.map(row =>
            row.uid === activeUid.toString()
                ? {...row, name: nameFile, dateEdit: convertDateFull(new Date())}
                : row
        ))
        setFileName(idTask!, activeUid, nameFile)
        addFileName(activeUid, nameFile, false, typeFile)
            .then(resp => {
                addNotification(notifications.length+1, 'Файл успешно переименован')
            })
            .catch(err => addNotification(notifications.length+1, 'Ошибка при переименовании файла', true))
        setNameFile('')
    };

    const changeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameFile(e.target.value)
    }

    const handleClickTag = (tag: string) => {
        setNameFile(prevState =>
            prevState === ''
                ? tag
                : prevState + `, ${tag}`
        )
    };

    const handleDelTag = (tagId: number, groupId: number) => {
        delTagById(tagId)
    }

    const handleSetTag = (newTag: string, groupId: number) => {
        setTag(newTag, groupId)
    }

    const handleRecognize = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (stopRecognize) {
            isListenRecognize
                ? stopRecognize()
                : startRecognize()
        }
    };

    useEffect(() => {
        textRecognize &&
            setNameFile(textRecognize)
    }, [textRecognize]);

    return (
        <div className="flex-1 flex flex-col py-[10px] px-[30px] overflow-y-scroll">
            <div className="flex flex-col mb-[10px]">
                <h3 className="text-xl mb-[5px]">Тэги</h3>
                <div className="flex flex-col gap-y-3">
                    {groupTags.map((gTag, id) => !gTag.is_local
                    ? (<TagGroup name={gTag.name} tags={gTag}
                                  handleClickTag={handleClickTag}
                                  handleDelTag={(tag) => handleDelTag(tag, gTag.uid ?? 0)}
                                  handleSetTag={(tag) => handleSetTag(tag, gTag.uid ?? 0)}
                                  groupId={gTag.uid ?? 0}
                                  key={id}
                                  lengthName={40}
                                  isAddTag isDeleteTag isSorted isResize isUnloading
                        />)
                    : (<TagGroup name={gTag.name}
                                 tags={{} as TGroupTag}
                                 validator={validateDate}
                                 handleClickTag={handleClickTag}
                                 groupId={333}
                                 isDeleteTag isAddTag
                       />)
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-grow items-start">
                <h3 className="text-xl mb-[5px]">Новое название файла</h3>
                <div className="relative w-full mb-[10px]">
                    <textarea name="" id="" placeholder="Новое название файла..."
                              onChange={changeTextArea}
                              value={nameFile}
                              className={`rounded-2xl border-[2px] py-[5px] px-[10px] h-full min-h-[60px] max-h-[100px]
                              border-solid focus:outline-none w-full resize-none bg-transparent border-mainDark
                              transition-all duration-700 ease-in-out
                              ${isListenRecognize && 'border-mainGreen'}
                              ${errorNameFile && 'border-red-400'}`}
                    />
                    {isAvailableSpeech && (
                        <button className="p-2" onClick={handleRecognize}>
                            <img src={isListenRecognize ? editName.micOn : editName.micOff}
                                 alt="Microfon" className="absolute bottom-1 right-1"/>
                        </button>
                    )}
                </div>
                {errorNameFile &&
                    <p className="text-[13px] -mt-[5px] mb-[5px] ml-[10px] text-red-400">
                        *{errorNameFile}
                    </p>}
                <div className="flex gap-x-1">
                    <FillButton onClick={handleSetNameFile}
                                classStyles={`${errorNameFile ? 'bg-red-400' : 'bg-mainGreen'} rounded-md`}
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