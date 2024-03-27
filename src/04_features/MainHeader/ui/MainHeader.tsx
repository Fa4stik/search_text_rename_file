import React, {useRef} from 'react';
import {header} from "../../../06_shared/ui/icon";
import {useLocation, useNavigate} from "react-router-dom";
import {BlockInfo, useGuideStore} from "../../../05_entities/Guide";
import {useMainStore, useRenameStore} from "../../../03_widgetes/MainTable";


type MainHeaderProps = {
    element: React.ReactNode;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
    element
}) => {

    const {setActivePage, statePages, isSomeActive} = useGuideStore()
    const {addRow: addMainRow, delRow: delMainRow} = useMainStore()
    const {addRow: addRenameRow, delRow: delRenameRow} = useRenameStore()

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
                let id = '777_333'

                if (!statePages.isMain) {
                    addMainRow({
                        id,
                        name: 'Название обработки',
                        countFiles: '22',
                        sizeFiles: '22мб',
                        status: 'В процессе',
                        dataStart: '11.02.2024 22:00:01',
                    })
                }

                if (statePages.isMain) {
                    delMainRow(id)
                }

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
                <a href="#" className="text-mainDark text-xl">
                    Распознавание текста и переименование файла</a>
                <button className="ml-auto z-[120]" onClick={handleActivateGuide}
                        title="Навигация по странице"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                         className={`fill-mainDark
                         ${isSomeActive && 'fill-mainWhite transition-all animate-pulse'}
                         `}
                    >
                        <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21
                                0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33
                                0.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57
                                0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48
                                17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10
                                73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83
                                31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54
                                54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127
                                85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134
                                0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                </button>
            </div>
            <div className="flex-1 flex overflow-hidden relative">
                <div className="flex flex-col items-center border-r-[2px] border-solid border-mainDark
                w-[80px] h-full py-[20px] sticky top-0 z-[120] bg-white"
                     id="toolbar"
                >
                    <div className="relative p-[10px]"
                    >
                        <div className="flex flex-col z-20">
                            <a href="#" onClick={handleChooseHome}>
                                <img src={header.home}
                                     alt="Home icon"
                                     className="h-[35px] w-auto mb-[20px]"
                                />
                            </a>
                            <a href="#" onClick={handleChooseEdit}>
                                <img src={header.edit}
                                     alt="Edit icon"
                                     className="h-[35px] w-auto mb-[20px]"
                                />
                            </a>
                        </div>
                        <div className="absolute top-[3px] left-[4.5px] transition-all ease-in-out
                        bg-mainDark/[0.2] h-[50px] w-[50px] z-10 rounded-md"
                             ref={activeLinkRef}
                        />
                        {statePages.isMain && (
                            <BlockInfo className={'-right-20 top-1/2 -translate-y-1/2'}>
                                Блок для выбора вкладки
                            </BlockInfo>
                        )}
                    </div>
                </div>
                <div className="flex-1 overflow-hidden flex flex-col justify-start">
                    {element}
                </div>
            </div>
            {isSomeActive && (
                <div className="z-[110] w-full h-full bg-mainDark/[0.8] absolute left-0 top-0"/>
            )}
        </>
    );
};