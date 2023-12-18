import React, {useEffect, useState} from 'react';
import {BorderInput} from "../../../06_shared/ui/input";
import {FillButton} from "../../../06_shared/ui/button";
import {TImage} from "../../../05_entities/CreateTaskForm";
import {getFiles, getFolders} from "../../../05_entities/FetchWorkWithData";

type OptionallyInfoProps = {
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>
}

export const OptionallyInfo:
    React.FC<OptionallyInfoProps> = ({setImages}) => {

    const [path, setPath] = useState<string>('')
    const [tipPaths, setTipPaths] = useState<string[]>([])

    const handleChangeFullPath = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPath(e.target.value)
        setTipPaths([e.target.value.split('/').at(-1) as string])
    };

    const handleSendPath = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getFiles(path, -1)
            .then(data =>
                setImages(data.files.map((file, id) =>
                    ({id: id.toString(), name: file, path: `${path}/${file}`})
            )))
    };

    useEffect(() => {
        const fetchTips = setTimeout(() => {
            getFolders(path, 4)
                .then(data => setTipPaths(data.folders))
                .catch(err => setTipPaths([]))
        }, 1000)

        return () => clearTimeout(fetchTips);
    }, [path]);

    const handleClickTip = (e: React.MouseEvent<HTMLParagraphElement>, tipPath: string) => {
        setPath(prevState => {
            const id = prevState.lastIndexOf('/')
            return prevState.slice(0, id)+'/'+tipPath
        })
        setTipPaths([])
    };

    return (
        <div className="flex gap-x-[15px] h-[35px]">
            <div className="relative w-5/6 z-20">
                <BorderInput placeholder={"Полный путь на сервере..."}
                             onChange={handleChangeFullPath}
                             value={path}
                             classStyle={`w-full h-[35px] rounded-xl z-30 ${path && tipPaths?.length > 0 && 'rounded-b-none'}`}
                />
                {tipPaths?.length > 0 &&
                    <div className="absolute top-[35px] left-0 h-full w-full flex flex-col z-10">
                        {tipPaths.map((tipPath, id) => (
                            path &&
                                <p key={id} className="py-[2px] px-[15px] bg-mainGray/[0.9]
                                            last:rounded-b-2xl hover:bg-mainDark/[0.8] hover:text-mainWhite
                                            border-x-[2px] border-solid border-x-mainDark
                                            last:border-b-mainDark last:border-b-[2px]"
                                   onClick={(e) => handleClickTip(e, tipPath)}
                                >
                                    {tipPath}
                                </p>
                        ))}
                    </div>
                }
            </div>
            <FillButton onClick={handleSendPath}
                        classStyles="flex-grow bg-mainGreen rounded-xl"
                        inlineStyles={{
                            marginRight: '0px'
                        }}
            >
                Отправить
            </FillButton>
        </div>
    );
};