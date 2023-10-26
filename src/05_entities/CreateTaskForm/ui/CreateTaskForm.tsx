import React, {useEffect} from 'react';
import {FillButton} from "../../../06_shared/ui/button";
import {convertSize} from "../../../03_widgetes/MainTable/lib/convertSize";
import {convertTime} from "../../../03_widgetes/MainTable/lib/converTime";
import {TImage} from "../model/types";

type CreateTaskFormProps = {
    images: TImage[];
    handleCreateTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
    handleCancelTask: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CreateTaskForm:
    React.FC<CreateTaskFormProps> = ({images,
                                     handleCreateTask,
                                     handleCancelTask}) => {

    return (
        <div className="w-auto h-auto py-[10px] pl-[15px] flex flex-col self-start
        border-mainDark border-solid border-[1px] bg-mainGray rounded-2xl">
            <h3 className="text-xl mb-[5px]">Информация</h3>
            <p className="">Всего получено файлов: {images.length}</p>
            <p className="">Общий размер: {convertSize(images)}</p>
            <p className="">Время обработки: ~{convertTime(images.length*2)}</p>
            <div className="flex w-[280px] mt-[10px]">
                <FillButton onClick={handleCreateTask}
                            classStyles="rounded-md bg-mainGreen"
                >
                    Создать задачу
                </FillButton>
                <FillButton onClick={handleCancelTask}
                            classStyles="bg-mainDark rounded-md"
                >
                    Очистить
                </FillButton>
            </div>
        </div>
    );
};