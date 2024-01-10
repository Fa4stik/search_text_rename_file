import React, {useEffect, useState} from 'react';
import {FillButton} from "../../../06_shared/ui/button";
import {TRow} from "../../../05_entities/DataGrid";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {convertDateFull} from "../../../05_entities/MainPage";
import {validateName} from "../../CreateTask";
import {TagGroup} from "../../../05_entities/RenameFiles";
import {delTagById, getGroupTags, getTagsByGroup, TGroupTag, TTag} from "../../../05_entities/FetchTags";
import {addFileName} from "../../../05_entities/FetchPipeline";
import {setTag} from "../../../05_entities/FetchTags";
import {delTagByName} from "../../../05_entities/FetchTags";
import {validateDate} from "../lib/validateDate";
import {useNotifyStore} from "../../../05_entities/Notifications";

type RenameFileProps = {
    setRows: React.Dispatch<React.SetStateAction<TRow[]>>
    nameFile: string
    setNameFile: React.Dispatch<React.SetStateAction<string>>
    idTask?: string
    activeUid: number
}

export const RenameFile:
    React.FC<RenameFileProps> = ({setRows,
                                 nameFile, setNameFile,
                                 idTask, activeUid}) => {
    const {setFileName} = useRenameStore()
    const {notifications, addNotification} = useNotifyStore()

    const [groupTags, setGroupTags] =
        useState<TGroupTag[]>([])
    const [isNotCorrectName, setIsNotCorrectName] = useState<boolean>(false)

    useEffect(() => {
        getGroupTags()
            .then(groupTagsResp => {
                const tagPromises = groupTagsResp.map(gTag =>
                    getTagsByGroup(gTag.uid)
                        .then((resp): TGroupTag => ({
                            uid: gTag.uid,
                            name: gTag.name,
                            content: resp.tags ?? []
                        }))
                        .catch(err => console.log(err))
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
        if (validateName(nameFile)) {
            setIsNotCorrectName(false)
            setRows(prevState => prevState.map(row =>
                row.uid === activeUid.toString()
                    ? {...row, name: nameFile, dateEdit: convertDateFull(new Date())}
                    : row
            ))
            setFileName(idTask!, activeUid, nameFile)
            addFileName(activeUid, nameFile, false)
                .then(resp => {
                    addNotification(notifications.length+1, 'Файл успешно переименован')
                })
                .catch(err => addNotification(notifications.length+1, 'Ошибка при переименовании файла', true))
            setNameFile('')
        } else {
            setIsNotCorrectName(true)
        }
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

    return (
        <div className="flex-1 flex flex-col py-[10px] px-[30px] overflow-y-scroll">
            <div className="flex flex-col mb-[10px]">
                <h3 className="text-xl mb-[5px]">Тэги</h3>
                {groupTags.map((gTag, id) => (
                    <TagGroup name={gTag.name} tags={gTag}
                              handleClickTag={handleClickTag}
                              handleDelTag={(tag) => handleDelTag(tag, gTag.uid)}
                              handleSetTag={(tag) => handleSetTag(tag, gTag.uid)}
                              key={id}
                              isAddTag isDeleteTag
                    />
                ))}
                <TagGroup name={'Дата'}
                          // count={1}
                          tags={{} as TGroupTag}
                          validator={validateDate}
                          handleClickTag={handleClickTag}
                          isDeleteTag isAddTag
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