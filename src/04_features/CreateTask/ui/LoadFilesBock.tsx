import React, {useEffect, useRef, useState} from 'react';
import {createTask} from "../../../06_shared/ui/icon";
import {TRow} from "../../../05_entities/DataGrid";
import {TImage} from "../../../05_entities/CreateTaskForm";
import {convertNameFile} from "../lib/convertNameFile";
import {getFilesExtention, getImagesExtension} from "../../../05_entities/FetchWorkWithData";

declare module "react" {
    interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
        webkitdirectory?: string;
    }
}

type LoadFilesBockProps = {
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>
}

export const LoadFilesBock: React.FC<LoadFilesBockProps> = ({
    setImages
}) => {

    const inputFolder = useRef<HTMLInputElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const [fileExtensions, setFileExtensions] =
        useState<string[]>([])
    const [imageExtensions, setImageExtensions] =
        useState<string[]>([])

    const loadFiles = (files: FileList) => {
        setImages([])
        if (files && files.length > 0) {
            const imageFiles = Array.from(files)
                .filter(file => fileExtensions.concat(imageExtensions)
                        .some(type => file.type.includes(type)))

            Array.from(imageFiles).forEach((file, id) => {
                setImages(prevState => [...prevState,
                    {
                        id: (id+1).toString(),
                        name: convertNameFile(file.name),
                        image: file
                    }
                ])
            })
        }
    }

    const handleLoadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        files &&
            loadFiles(files)
    };

    const handleDropped = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        loadFiles(files)
    };

    useEffect(() => {
        getFilesExtention()
            .then(resp => setFileExtensions(resp))
            .catch(err => console.log(err))

        getImagesExtension()
            .then(resp => setImageExtensions(resp))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="flex-grow pb-[15px] flex"
             onDragEnter={(e) =>
                 buttonRef.current!.style.borderColor = '#15C585'
             }
             onDragExit={(e) =>
                 buttonRef.current!.style.borderColor = '#434343'
             }
             onDrop={handleDropped}
             onDragOver={(e) => e.preventDefault()}
        >
            <button className="flex-grow border-dashed border-4 border-mainDark rounded-3xl
                            flex flex-col items-center justify-center"
                    style={{
                        transition: 'border-color ease-in-out 0.3s'
                    }}
                    ref={buttonRef}
                    onClick={(e) => {
                        e.preventDefault()
                        inputFolder.current!.click()
                    }}
            >
                <img src={createTask.upload} alt="Choose folder"/>
                <div className="flex flex-col justify-center items-center px-20">
                    <p className="text-xl">
                        Выберите папку / Перетащите файл(ы)
                    </p>
                    <p>Поддерживаемые форматы: {fileExtensions
                        .concat(imageExtensions)
                        .map(ext => '*.' + ext)
                        .join(', ')}</p>
                </div>
            </button>
            <input type="file" hidden
                   ref={inputFolder}
                   webkitdirectory={""}
                   onChange={handleLoadFiles}
            />
        </div>
    );
};