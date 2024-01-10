import React from 'react';
import {CreateTaskGrid, LoadFilesBock, MainInfo, OptionallyInfo} from "../../../04_features/CreateTask";
import {TImage} from "../../../05_entities/CreateTaskForm";

type CreateTaskBlockInfoProps = {
    images: TImage[];
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>
    setNameTask: React.Dispatch<React.SetStateAction<string>>
    isLocalPath: boolean;
    setIsLocalPath: React.Dispatch<React.SetStateAction<boolean>>
    setCurrModel: React.Dispatch<React.SetStateAction<string>>
    error: string
}

export const CreateTaskBlockInfo:
    React.FC<CreateTaskBlockInfoProps> = ({images,
                                              setImages,
                                              setNameTask,
                                          isLocalPath,
                                          setIsLocalPath,
                                          setCurrModel,
                                              error}) => {

    const changeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameTask(e.target.value)
    };

    return (
        <div className="flex-1 flex pr-[50px]">
            <div className="flex flex-col flex-grow bg-mainGray
                border-solid border-[2px] border-mainDark rounded-t-2xl pt-[10px] px-[20px] border-b-transparent">
                <h3 className="text-2xl mb-[15px]">Параметры задачи</h3>
                <div className="flex flex-col gap-y-[10px] mb-[15px]">
                    <MainInfo changeNameTask={changeNameTask}
                              setIsLocalPath={setIsLocalPath}
                              setCurrModel={setCurrModel}
                              isNotCorrect={!!error}
                    />
                    {error &&
                        <p className="text-[13px] -my-[5px] ml-[10px] text-red-400">
                            *{error}
                        </p>}
                    {!isLocalPath && <OptionallyInfo setImages={setImages}/>}

                </div>
                {isLocalPath
                    ? images?.length > 0
                        ? <CreateTaskGrid images={images}
                                          setImages={setImages}
                                          isLocalPath={isLocalPath}
                        />
                        : <LoadFilesBock setImages={setImages}/>
                    : <CreateTaskGrid images={images}
                                      setImages={setImages}
                                      isLocalPath={isLocalPath}
                    />}
            </div>
        </div>
    );
};