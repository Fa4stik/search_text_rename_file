import React, {useRef, useState} from 'react';
import {CreateTaskForm, TImage} from "../../../05_entities/CreateTaskForm";
import {CreateTaskBlockInfo} from "../../../03_widgetes/CreateTaskBlockInfo";
import {useMainStore, useRenameStore} from "../../../03_widgetes/MainTable";
import {convertSize} from "../../../03_widgetes/MainTable/lib/convertSize";
import {useNavigate} from "react-router-dom";
import {convertTime} from "../../../03_widgetes/MainTable/lib/converTime";
import {convertDateFull} from "../../../05_entities/MainPage";
import {validateName} from "../../../04_features/CreateTask";
import {getChunkId, processChunk, TProcessChunkResp, uploadFiles} from "../../../05_entities/FetchPipeline";
import {useNotifyStore} from "../../../05_entities/Notifications";

const MainCreatePage = () => {
    const [images, setImages] = useState<TImage[]>([])
    const [nameTask, setNameTask] = useState<string>('')
    const [isLocalPath, setIsLocalPath] = useState<boolean>(true)
    const [currModel, setCurrModel] = useState<string>('None')
    const [error, setError] =
        useState<string>('')

    const navigate = useNavigate()

    const {addRow: addMainRow, rows, delRow: delMainRow, setStatus} = useMainStore();
    const {addRow: addRenameRow, rows: renameRows} = useRenameStore()
    const {addNotification, notifications} = useNotifyStore()

    const ws = useRef<WebSocket | null>(null)

    const prcImg = (id: string, dateStart: Date) => {
        if (isLocalPath) {
            const imagesPromise = images.map(file => uploadFiles(file.image as File, id))
            Promise.all(imagesPromise)
                .then(() => {
                    let myInterval: NodeJS.Timer

                    ws.current = new WebSocket(`ws://${process.env.REACT_APP_SERVER_PATH}/api/ws?` +
                        new URLSearchParams({chunk_id: id, ocr_model_type: currModel}))

                    ws.current!.onopen = () => {
                        console.log('Ws open')
                        myInterval = setInterval(() => {
                            ws.current!.send('update')
                            console.log('update ws')
                        }, 5000)
                    }

                    ws.current!.onmessage = (mess) => {
                        const resp: TProcessChunkResp = JSON.parse(mess.data)
                        delMainRow(id)
                        addRenameRow({
                                        id,
                                        name: nameTask,
                                        countFiles: images.length.toString(),
                                        sizeFiles: convertSize(images),
                                        timeHandle: convertTime((Date.now() - dateStart.getTime())/1000),
                                        renameFiles: resp.results.map(process =>
                                            ({
                                                is_duplicate: false,
                                                uid: process.uid,
                                                dateEdit: convertDateFull(new Date()),
                                                name: process.old_filename
                                            })
                                        )
                                    })
                    }

                    ws.current!.onclose = (mess) => {
                        if (mess.code !== 1000) {
                            setStatus(id, 'Ошибка обработки')
                            addNotification(notifications.length+1, 'Возникла ошибка при обработке', true)
                        }
                        addNotification(notifications.length+1, 'Задача успешно обработана')
                        clearInterval(myInterval)
                    }
                })
                .catch(err => console.log(err))
        } else {
            processChunk(parseInt(id), currModel)
                .then(respProcess => {
                    delMainRow(id)
                    addRenameRow({
                        id,
                        name: nameTask,
                        countFiles: images.length.toString(),
                        sizeFiles: convertSize(images),
                        timeHandle: convertTime((Date.now() - dateStart.getTime())/1000),
                        renameFiles: respProcess.results.map(process =>
                            ({
                                is_duplicate: false,
                                uid: process.uid,
                                dateEdit: convertDateFull(new Date()),
                                name: process.old_filename
                            })
                        )
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

        console.log(currModel)

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
            .then(() => addNotification(notifications.length+1, 'Задача успешно создана'))
            .catch(() => addNotification(notifications.length+1, 'Ошибка создания задачи', true))
        navigate('/main')
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
                                     setCurrModel={setCurrModel}
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