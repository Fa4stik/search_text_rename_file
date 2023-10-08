import React, {useRef} from 'react';
import {FillButton} from "../../../06_shared/ui/button";
import {CreateTaskForm} from "../../../05_entities/CreateTaskForm";
import {BorderInput} from "../../../06_shared/ui/input";
import {createTask} from "../../../06_shared/ui/icon";
declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}

const MainCreatePage = () => {

    const inputFolder = useRef<HTMLInputElement | null>(null);

    const changeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleLoadFolder = (e: React.MouseEvent<HTMLLabelElement>) => {
        inputFolder.current!.click()
    };

    const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (inputFolder.current) {
            console.log(inputFolder.current?.files)
        }
    };

    return (
        <div className="w-full h-full px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[25px]">Создание задачи</h1>
            <div className="w-full h-full flex">
                <div className="w-full h-full pr-[50px]">
                    <div className="w-full h-full bg-mainGray border-solid
                    border-[2px] border-mainDark rounded-2xl pt-[10px] px-[20px]">
                        <h3 className="text-2xl mb-[15px]">Название задачи</h3>
                        <BorderInput placeholder={'Название задачи...'} onChange={changeNameTask}/>
                        <div className="w-full h-full px-[10px] pt-[20px] pb-[120px]">
                            <label className="flex flex-col items-center justify-center h-full w-full
                        border-mainDark border-dashed border-[5px] rounded-2xl"
                                   onClick={handleLoadFolder}
                            >
                                <input type="file" hidden={true}
                                       placeholder="Выберите папку..."
                                       onChange={handleChangeFiles}
                                       ref={(node) => {
                                           inputFolder.current = node;
                                           if (node) {
                                               ['webkitdirectory', 'directory', 'mozdirectory'].forEach((attr) => {
                                                   node.setAttribute(attr, '');
                                               });
                                           }
                                       }}
                                />
                                <img src={createTask.upload} alt="" className=""/>
                                <p>Выберите папку с файлами</p>
                            </label>
                        </div>
                    </div>
                </div>
                <CreateTaskForm/>
            </div>
        </div>
    );
};

export default MainCreatePage;