import React, {useRef} from 'react';
import {createTask} from "../../../06_shared/ui/icon";
import {TRow} from "../../../05_entities/DataGrid";
import {TImage} from "../../../05_entities/CreateTaskForm";
import {convertNameFile} from "../model/convertNameFile";

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}

type LoadFilesBockProps = {
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>
}

export const LoadFilesBock:
    React.FC<LoadFilesBockProps> = ({setImages}) => {

    const inputFolder = useRef<HTMLInputElement>(null)

    const handleLoadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        setImages([])
        if (files && files.length > 0) {
            const imageFiles = Array.from(files).filter(file => file.type.includes('image'))

            Array.from(imageFiles).forEach((file, id) => {
                setImages(prevState => [...prevState,
                    {
                        id: id.toString(),
                        name: convertNameFile(file.name),
                        image: file
                    }
                ])
            })
        }
    };

    return (
        <div className="flex-grow pb-[15px] flex">
            <button className="flex-grow border-dashed border-4 border-mainDark rounded-3xl
                            flex flex-col items-center justify-center"
                    onClick={(e) => {
                        e.preventDefault()
                        inputFolder.current!.click()
                    }}
            >
                <img src={createTask.upload} alt="Choose folder"/>
                <p className="text-xl">Выберите папку</p>
            </button>
            <input type="file" hidden
                   ref={inputFolder}
                   webkitdirectory={""}
                   onChange={handleLoadFiles}
            />
        </div>
    );
};