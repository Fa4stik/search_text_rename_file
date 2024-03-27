import React, {useRef, useState} from 'react';
import {CreateTaskForm, TImage} from "../../../05_entities/CreateTaskForm";
import {CreateTaskBlockInfo} from "../../../03_widgetes/CreateTaskBlockInfo";
import {useMainStore, useRenameStore} from "../../../03_widgetes/MainTable";
import {convertSize} from "../../../03_widgetes/MainTable/lib/convertSize";
import {useNavigate} from "react-router-dom";
import {convertTime} from "../../../03_widgetes/MainTable/lib/converTime";
import {convertDateFull} from "../../../05_entities/MainPage";
import {validateName} from "../../../04_features/CreateTask";
import {
    getChunkId,
    processChunk,
    TProcessChunkResp,
    TProcessDataMessage,
    TRespSocket,
    uploadFiles
} from "../../../05_entities/FetchPipeline";
import {useNotifyStore} from "../../../05_entities/Notifications";
import {useUserSettings} from "../../../05_entities/UserSettings";

const MainCreatePage = () => {
    const [images, setImages] = useState<TImage[]>([])
    const [nameTask, setNameTask] = useState<string>('')
    const [isLocalPath, setIsLocalPath] = useState<boolean>(true)
    const [error, setError] =
        useState<string>('')

    const navigate = useNavigate()

    const {addRow: addMainRow, rows, delRow: delMainRow, setStatus, setLoading} = useMainStore();
    const {addRow: addRenameRow, rows: renameRows} = useRenameStore()
    const {addNotification, notifications} = useNotifyStore()
    const {settings} = useUserSettings()

    const ws = useRef<WebSocket | null>(null)

    const prcImg = (id: string, dateStart: Date) => {
        if (isLocalPath) {
            uploadFiles(images.map(file => file.image as File), id)
                .then((resp) => {
                    let myInterval: NodeJS.Timeout

                    let isSsl = false;

                    window.location.protocol === "https:" &&
                        (isSsl = true)

                    ws.current = new WebSocket([
                        isSsl ? 'wss' : 'ws', '://',
                        process.env.REACT_APP_SERVER_PATH ?? window.location.host, '/api/ws?',
                        new URLSearchParams({chunk_id: id, ocr_model_type: settings.defaultModelName})
                    ].join(''))

                    ws.current!.onopen = () => {
                        myInterval = setInterval(() => {
                            ws.current!.send(JSON.stringify({action: 'ping'}))
                        }, 5000)
                    }

                    ws.current!.onmessage = (mess) => {
                        const resp: TRespSocket = JSON.parse(mess.data)

                        if (resp.action === 'chunk') {
                            const chunkResp = resp as (TProcessChunkResp & TRespSocket)
                            setTimeout(() => {
                                delMainRow(id)
                                addRenameRow({
                                    id,
                                    name: nameTask,
                                    countFiles: images.length.toString(),
                                    sizeFiles: convertSize(images),
                                    timeHandle: convertTime((Date.now() - dateStart.getTime())/1000),
                                    renameFiles: chunkResp.results.map(process => ({
                                        is_duplicate: false,
                                        uid: process.uid,
                                        dateEdit: convertDateFull(new Date()),
                                        heirs: process.heirs?.map(heir => ({
                                            ...heir,
                                            uid: heir.uid.toString(),
                                            id: heir.uid.toString(),
                                            name: heir.old_filename,
                                            dateEdit: convertDateFull(new Date())
                                        })),
                                        isActive: false,
                                        name: process.old_filename
                                    })),
                                })
                            }, 1500)
                        }

                        if (resp.action === 'progress_bar') {
                            const iterResp = resp as (TProcessDataMessage & TRespSocket)
                            setLoading(id, Math.floor(((iterResp.iter+1) / iterResp.length)*100))
                        }
                    }

                    ws.current!.onclose = (mess) => {
                        if (mess.code !== 1000) {
                            setStatus(id, 'Ошибка обработки')
                            addNotification(notifications.length+1, 'Возникла ошибка при обработке', true)
                        }

                        if (mess.code === 1000) {
                            addNotification(notifications.length+1, 'Задача успешно обработана')
                            clearInterval(myInterval)
                        }
                    }
                })
        } else {
            processChunk(parseInt(id), settings.defaultModelName)
                .then(respProcess => {
                    delMainRow(id)
                    addRenameRow({
                        id,
                        name: nameTask,
                        countFiles: images.length.toString(),
                        sizeFiles: convertSize(images),
                        timeHandle: convertTime((Date.now() - dateStart.getTime())/1000),
                        renameFiles: respProcess.results.map(process => ({
                            is_duplicate: false,
                            uid: process.uid,
                            dateEdit: convertDateFull(new Date()),
                            heirs: process.heirs?.map(heir => ({
                                ...heir,
                                uid: heir.uid.toString(),
                                id: heir.uid.toString(),
                                name: heir.old_filename,
                                dateEdit: convertDateFull(new Date())
                            })),
                            isActive: false,
                            name: process.old_filename
                        }))
                    })
                })
                .catch(err => setStatus(id, 'Ошибка обработки'))
        }
    }

    const handleCreateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (!validateName(nameTask)) {
            setError('Некорректное название задачи, нельзя использовать символы \\ / : ? " < > |')
            return;
        }

        if (images.length === 0) {
            setError('Загрузите файлы для обработки')
            return;
        }

        setError('')

        const dateStart = new Date()

        getChunkId().then(resp => {
            const id = resp.toString();
            addMainRow({
                id,
                name: nameTask,
                countFiles: images.length.toString(),
                sizeFiles: convertSize(images),
                status: 'В процессе',
                dataStart: convertDateFull(dateStart)
            })

            prcImg(id, dateStart)
        })
            .then(() => {
                addNotification(notifications.length + 1, 'Задача успешно создана')
                navigate('/main')
            })
            .catch(() => addNotification(notifications.length+1, 'Ошибка создания задачи', true))
    };

    const handleCancelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setImages([])
    };

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Создание задачи</h1>
            <div className="flex-grow flex overflow-hidden">
                <CreateTaskBlockInfo images={images}
                                     setImages={setImages}
                                     setNameTask={setNameTask}
                                     setIsLocalPath={setIsLocalPath}
                                     isLocalPath={isLocalPath}
                                     error={error}
                />
                <CreateTaskForm images={images}
                                handleCreateTask={handleCreateTask}
                                handleCancelTask={handleCancelTask}
                />
            </div>
        </div>
    );
};

export default MainCreatePage;