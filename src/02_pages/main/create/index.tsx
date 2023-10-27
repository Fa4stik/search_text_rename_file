import React, {useState} from 'react';
import {CreateTaskForm, TImage} from "../../../05_entities/CreateTaskForm";
import {CreateTaskBlockInfo} from "../../../03_widgetes/CreateTaskBlockInfo";
import {useMainStore, useRenameStore} from "../../../03_widgetes/MainTable";
import {convertSize} from "../../../03_widgetes/MainTable/lib/convertSize";
import {useNavigate} from "react-router-dom";
import {processImage, uploadFiles} from "../../../05_entities/CreateTaskFetchData";
import {convertTime} from "../../../03_widgetes/MainTable/lib/converTime";
import {convertDateFull} from "../../../05_entities/MainPage";

const MainCreatePage = () => {
    const [images, setImages] = useState<TImage[]>([])
    const [nameTask, setNameTask] = useState<string>('')
    const [isLocalPath, setIsLocalPath] = useState<boolean>(true)

    const navigate = useNavigate()

    const {addRow: addMainRow, rows, delRow: delMainRow} = useMainStore();
    const {addRow: addRenameRow} = useRenameStore()

    const handleCreateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const dateStart = new Date()
        const id = (rows.length+1).toString()

        addMainRow({
            id,
            name: nameTask,
            countFiles: images.length.toString(),
            sizeFiles: convertSize(images),
            status: 'В процессе',
            dataStart: convertDateFull(dateStart)
        })

        if (isLocalPath) {
            uploadFiles(images.map(image => image.image) as File[])
                .then(respUpload => {
                    console.log('Files upload')
                    processImage(parseInt(id), respUpload.paths)
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
                        .catch(err => console.log(err))
                })
        } else {
            processImage(parseInt(id), images.map(image => image.path) as string[])
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
                .catch(err => console.log(err))
        }
        navigate('/main')
    };

    const handleCancelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const date = new Date()
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