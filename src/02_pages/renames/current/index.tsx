import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {GridHeader} from "../../../04_features/GridHeader";
import {FilesBlock, ImageWrapper, RenameFile} from "../../../04_features/RenameFiles";
import {columnsReadyFiles} from "../../../04_features/RenameFiles/model/gridStyles";
import {TRow} from "../../../05_entities/DataGrid";
import {getDataById, getFile, TBbox} from "../../../05_entities/RenameFileFetchData";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {getOcrModels} from "../../../05_entities/CreateTaskFetchData";
import {TOption} from "../../../06_shared/model/typeSelect";
import {convertNameFile} from "../../../04_features/CreateTask";

type PageParams = {
    idTask: string
}

const RenamesCurrentPage = () => {
    const {idTask} = useParams<PageParams>()

    const {rows: renamesRows} = useRenameStore()

    const [tags, setTags] = useState<string[]>([])
    const [rows, setRows] = useState<TRow[]>(renamesRows.find(rR =>
            rR.id === idTask)!.renameFiles.map((file, id) => ({
                ...file,
                is_duplicate: file.is_duplicate ? '1' : '',
                uid: file.uid.toString(),
                id: (id+1).toString(),
            })
        )
    )
    const [bboxes, setBboxes] = useState<TBbox[]>([])
    const [srcImg, setSrcImg] = useState<string>('')
    const [nameFile, setNameFile] = useState<string>('')
    const [activeUid, setActiveUid] = useState<number>(0)
    const [isResizeRow, setIsResizeRow] = useState<boolean>(false)
    const [isResizeCol, setIsResizeCol] = useState<boolean>(false)
    const [models, setModels] = useState<TOption[]>([])
    const [currRotate, setCurrRotate] =
        useState<number>(0)

    const resizeRowRef = useRef<HTMLDivElement>(null)
    const resizeColRef = useRef<HTMLDivElement>(null)
    const tableContentRef = useRef<HTMLDivElement>(null)

    // get models
    useEffect(() => {
        getOcrModels().then(resp => {
            setModels(resp.models.map((model, id) => ({key: id, value: model})))
        }).catch(err => console.log(err))
    }, []);

    const handleClickBox = (e: React.MouseEvent<HTMLDivElement>, word: string) => {
        setNameFile(prevState => prevState + word + ' ')
    }

    const handleClickRow = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        const uid = parseInt(rows.find(row => row.id === id)!.uid)
        const name = rows.find(row => row.id === id)!.name
        setNameFile(name)
        setActiveUid(uid)
        getDataById(uid)
            .then(resp => {
                setBboxes(resp.bboxes.map((bbox, id) =>
                    ({...bbox, word: resp.text[id]})))
                setTags(resp.tags)
            })
            .catch(err => {
                console.log(err);
            })
        getFile(uid)
            .then(resp => {
                setSrcImg(resp)

            })
            .catch(err => {
                console.log(err);
            })
    };

    const stopResized = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsResizeCol(false)
        setIsResizeRow(false)
    }

    const handleResizeBlocks = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isResizeCol) {
            const tableContentWidth = tableContentRef.current!.getBoundingClientRect().width
            const rightLimit = (tableContentWidth*2)/3
            const leftLimit = (tableContentWidth)/4
            const deltaX = e.clientX - resizeColRef.current!.getBoundingClientRect().left;
            const newWidth = Math.min(Math.max(leftLimit, deltaX), rightLimit)
            resizeColRef.current!.style.width = `${newWidth}px`;
        }

        if (isResizeRow) {
            const tableContentHeight = tableContentRef.current!.getBoundingClientRect().height
            const upLimit = (tableContentHeight)/4
            const downLimit = (tableContentHeight*2)/3
            const deltaY = e.clientY - resizeRowRef.current!.getBoundingClientRect().top;
            const newHeight = Math.min(Math.max(upLimit, deltaY), downLimit)
            resizeRowRef.current!.style.height = `${newHeight}px`;
        }
    };

    const handleRegenerateImg = (e: React.MouseEvent<HTMLSpanElement>, value: string | number) => {
        console.log(value, currRotate)
    }

    return (
        <div className="flex-1 px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Переименование файлов</h1>
            <div className="flex-1 flex flex-col overflow-hidden"
                 onMouseUp={stopResized} onMouseLeave={stopResized} onMouseMove={handleResizeBlocks}
            >
                <GridHeader sorted filters/>
                <div className="flex-1 flex bg-mainGray overflow-hidden" ref={tableContentRef}>
                    <div className="w-1/3 h-full flex flex-col"
                         ref={resizeColRef}
                    >
                        <div className="w-full h-1/2 flex flex-col select-none" ref={resizeRowRef}>
                            <FilesBlock rows={rows.map(row =>
                                ({...row, name: convertNameFile(row.name, 15, true)}))}
                                        columns={columnsReadyFiles}
                                        rowOnClick={handleClickRow}
                            />
                        </div>
                        <div className="w-full h-[4px] bg-mainDark cursor-row-resize"
                             onMouseDown={(e) => {
                                 e.preventDefault()
                                 setIsResizeRow(true)
                             }}
                        />
                        <RenameFile setRows={setRows} tags={tags} idTask={idTask} activeUid={activeUid}
                                    nameFile={nameFile} setNameFile={setNameFile}/>
                    </div>
                    <div className="w-[2px] h-full bg-mainDark cursor-col-resize"
                         onMouseDown={(e) => {
                             e.preventDefault()
                             setIsResizeCol(true)
                         }}
                    />
                    <ImageWrapper handleClickBox={handleClickBox}
                                  myBoxes={bboxes}
                                  srcImg={srcImg}
                                  isDark
                                  isRefresh
                                  isRotate
                                  isZoom
                                  handleChoseOption={handleRegenerateImg}
                                  models={models}
                                  setCurrRotate={setCurrRotate}
                                  currRotate={currRotate}
                    />
                </div>
            </div>
        </div>
    );
};

export default RenamesCurrentPage;