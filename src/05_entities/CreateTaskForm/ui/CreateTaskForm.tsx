import React from 'react';
import {FillButton} from "../../../06_shared/ui/button";

type CreateTaskFormProps = {

}

export const CreateTaskForm: React.FC<CreateTaskFormProps> =
    ({}) => {
    return (
        <div className="w-auto h-auto py-[10px] pl-[15px] flex flex-col self-start
        border-mainDark border-solid border-[1px] bg-mainGray rounded-2xl">
            <h3 className="text-xl mb-[5px]">Информация</h3>
            <p className="">Всего получено файлов: 100</p>
            <p className="">Общий размер: 123,24 мб</p>
            <p className="">Время обработки: ~5 мин.</p>
            <div className="flex w-[280px] mt-[10px]">
                <FillButton onClick={(e) => e.preventDefault()}>
                    Создать задачу
                </FillButton>
                <FillButton onClick={(e) => e.preventDefault()}
                            classStyles="bg-mainDark"
                >
                    Отменить
                </FillButton>
            </div>
        </div>
    );
};