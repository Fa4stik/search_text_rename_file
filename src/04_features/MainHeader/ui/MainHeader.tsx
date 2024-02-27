import React, {useRef} from 'react';
import {guide, header} from "../../../06_shared/ui/icon";
import {useLocation, useNavigate} from "react-router-dom";
import {useGuideStore} from "../../../05_entities/Guide";


type MainHeaderProps = {
    element: React.ReactNode;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
    element
}) => {

    const {setActivePage, statePages} = useGuideStore()

    const activeLinkRef = useRef<HTMLDivElement | null>(null)

    const location = useLocation()
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

    const handleActivateGuide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        switch (location.pathname) {
            case '/main':
                setActivePage('isMain', !statePages.isMain)
                break;
            case '/main/create':
                setActivePage('isMainCreate', !statePages.isMainCreate)
                break;
            case '/renames':
                setActivePage('isRenames', !statePages.isRenames)
                break;
            default:
                const match = location.pathname.match(/\/renames\/(\d+)$/)
                if (match) {
                    setActivePage('isRenamesCurr', !statePages.isRenamesCurr)
                }
        }
    };

    return (
        <>
            <div className="px-[40px] border-b-[2px] py-[10px]
            border-solid w-full border-mainDark flex items-center">
                <a href="#" className="text-mainDark text-xl">Распознавание текста и переименование файла</a>
                <button className="ml-auto z-[120]" onClick={handleActivateGuide}
                        title="Навигация по странице"
                >
                    <img src={header.question} alt="Guide"/>
                </button>
            </div>
            <div className="flex-1 flex overflow-hidden relative">
                <div className="flex flex-col items-center border-r-[2px] border-solid border-mainDark
                w-[80px] h-full py-[20px] sticky top-0 z-[120]"
                     id="toolbar"
                >
                    {/*white*/}
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
                        <div className="absolute top-[3px] left-[4.5px] transition-all ease-in-out
                        bg-mainDark/[0.2] h-[50px] w-[50px] z-[-1] rounded-md"
                             ref={activeLinkRef}
                        />
                        {/*<div className="absolute -right-20 top-1/2 flex w-full*/}
                        {/*whitespace-nowrap text-mainWhite gap-2 text-xl -translate-y-1/2">*/}
                        {/*    <img src={guide.arrow} alt=""/>*/}
                        {/*    <p>Блок для выбора вкладки</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col justify-start">
                    {element}
                </div>
            </div>
            {Object.values(statePages).some(statePage => statePage) && (
                <div className="z-[110] w-full h-full bg-mainDark/[0.7] absolute left-0 top-0"/>
            )}
        </>
    );
};