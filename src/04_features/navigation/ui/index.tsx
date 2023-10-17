import React, {useRef} from 'react';
import {header} from "../../../06_shared/ui/icon";
import {useNavigate} from "react-router-dom";


type NavigationProps = {
    routing: React.ReactNode;
}

export const Navigation: React.FC<NavigationProps> = ({routing}) => {
    const activeLinkRef = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()

    const handleChooseHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        activeLinkRef.current!.style.transform = 'translateY(0)';
        navigate('/main')
    };

    const handleChooseEdit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        activeLinkRef.current!.style.transform = 'translateY(55px)';
        navigate('/renames')
    };

    const handleChooseReady = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        activeLinkRef.current!.style.transform = 'translateY(110px)';
        navigate('/ready')
    };

    return (
        <>
            <div className="px-[40px] border-b-[2px] sticky top-0 py-[10px]
            border-solid w-full border-mainDark flex items-center">
                <a href="#" className="text-mainDark text-xl">Распознавание текста и переименование файла</a>
            </div>
            <div className="flex-grow flex overflow-hidden">
                <div className="flex flex-col items-center border-r-[2px] border-solid border-mainDark
                w-[80px] h-full py-[20px] sticky top-0">
                    <div className="relative p-[10px]">
                        <a href="#"
                           onClick={handleChooseHome}
                        >
                            <img src={header.home}
                                 alt="Home icon"
                                 className="h-[35px] w-auto mb-[20px]"
                            />
                        </a>
                        <a href="#"
                           onClick={handleChooseEdit}
                        >
                            <img src={header.edit}
                                 alt="Edit icon"
                                 className="h-[35px] w-auto mb-[20px]"
                            />
                        </a>
                        <a href="#"
                           onClick={handleChooseReady}
                        >
                            <img src={header.ready}
                                 alt="Edit icon"
                                 className="h-[35px] w-auto"
                            />
                        </a>
                        <div className="absolute top-[3px] left-[4.5px] transition-all ease-in-out
                        bg-mainDark/[0.2] h-[50px] w-[50px] z-[-1] rounded-md"
                             ref={activeLinkRef}
                        />
                    </div>
                </div>
                <div className="flex-grow overflow-hidden flex flex-col justify-start">
                    {routing}
                </div>
            </div>
        </>
    );
};