import React, {useState} from 'react';
import {CreateTaskForm, TImage} from "../../../05_entities/CreateTaskForm";
import {CreateTaskBlockInfo} from "../../../03_widgetes/CreateTaskBlockInfo";
import {useMainStore} from "../../../03_widgetes/MainTable";
import {convertSize} from "../../../03_widgetes/MainTable/lib/convertSize";
import {useNavigate} from "react-router-dom";

const MainCreatePage = () => {
    const [images, setImages] = useState<TImage[]>([])
    const [nameTask, setNameTask] = useState<string>('')

    const navigate = useNavigate()

    const addRow = useMainStore(state => state.addRow);

    const handleCreateTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const date = new Date()
        addRow({
            id: "0",
            name: nameTask,
            countFiles: images.length.toString(),
            sizeFiles: convertSize(images),
            status: 'В процессе',
            dataStart: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        })
        navigate('/main')
    };

    const handleCancelTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const date = new Date()
        addRow({
            id: "0",
            name: nameTask,
            countFiles: images.length.toString(),
            sizeFiles: convertSize(images),
            status: 'Отменено',
            dataStart: date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        })
        navigate('/main')
    };

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Создание задачи</h1>
            <div className="flex-grow flex overflow-hidden">
                <CreateTaskBlockInfo images={images}
                                     setImages={setImages}
                                     setNameTask={setNameTask}
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