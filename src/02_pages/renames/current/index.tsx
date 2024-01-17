import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {GridHeader} from "../../../04_features/GridHeader";
import {FilesBlock, ImageWrapper, RenameFile} from "../../../04_features/RenameFiles";
import {columnsReadyFiles} from "../../../04_features/RenameFiles/model/gridStyles";
import {TRow} from "../../../05_entities/DataGrid";
import {useRenameStore} from "../../../03_widgetes/MainTable";
import {TOption} from "../../../06_shared/model/typeSelect";
import {convertNameFile} from "../../../04_features/CreateTask";
import {getDataById, processImage, TBbox, TImgSizes} from "../../../05_entities/FetchPipeline";
import {getOcrModels} from "../../../05_entities/FetchOCR";
import {getFile} from "../../../05_entities/FetchWorkWithData";
import {useImgStore} from "../../../05_entities/ImageWrapper";

type PageParams = {
    idTask: string
}

const RenamesCurrentPage = () => {
    const {idTask} = useParams<PageParams>()

    const {rows: renamesRows, updateUid} = useRenameStore()

    const [rows, setRows] = useState<TRow[]>(renamesRows.find(rR =>
        rR.id === idTask)!.renameFiles
        .filter(file => file.uid)
        .map((file, id) => ({
                ...file,
                is_duplicate: file.is_duplicate ? '1' : '',
                uid: file.uid.toString(),
                id: (id + 1).toString(),
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
    const [isLoadingImgWrapper, setIsLoadingImgWrapper] =
        useState<boolean>(false)
    const [currCrop, setCurrCrop] = useState<number>(0)
    const [imgRect, setImgRect] =
        useState<TImgSizes>({x1: 0, y1: 0, width: 0, height: 0})
    const [resetTools, setResetTools] =
        useState<boolean>(false)

    const resizeRowRef = useRef<HTMLDivElement>(null)
    const resizeColRef = useRef<HTMLDivElement>(null)
    const tableContentRef = useRef<HTMLDivElement>(null)

    const {setLastScale, setScale, setBounds, setCord} = useImgStore()

    // get models
    useEffect(() => {
        getOcrModels().then(resp => {
            setModels(resp.models.map((model, id) => ({key: id, value: model})))
        }).catch(err => console.log(err))
    }, []);

    const handleClickBox = (e: React.MouseEvent<HTMLDivElement>, word: string) => {
        e.stopPropagation()
        setNameFile(prevState =>
            prevState.length === 0
                ? word
                : prevState + ' ' + word
        )
    }

    const handleClickRow = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        setLastScale(0)
        setCord(0, 0)
        setBounds({left: 0, bottom: 0, top: 0, right: 0})
        setScale(1)
        setResetTools(prevState => !prevState)

        const uid = parseInt(rows.find(row => row.id === id)!.uid)
        const name = rows.find(row => row.id === id)!.name
        setNameFile(name)
        setActiveUid(uid)
        getDataById(uid)
            .then(resp => {
                setBboxes(resp.bboxes.map((bbox, id) =>
                    ({...bbox, word: resp.text[id]})))
                setCurrRotate(resp.angle)
            })
            .catch(err => {
                console.log(err);
            })
        getFile(uid)
            .then(resp => {
                setSrcImg(resp+`?timestamp=${Date.now()}`)
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
            const rightLimit = (tableContentWidth * 2) / 3
            const leftLimit = (tableContentWidth) / 4
            const deltaX = e.clientX - resizeColRef.current!.getBoundingClientRect().left;
            const newWidth = Math.min(Math.max(leftLimit, deltaX), rightLimit)
            resizeColRef.current!.style.width = `${newWidth}px`;
        }

        if (isResizeRow) {
            const tableContentHeight = tableContentRef.current!.getBoundingClientRect().height
            const upLimit = (tableContentHeight) / 4
            const downLimit = (tableContentHeight * 2) / 3
            const deltaY = e.clientY - resizeRowRef.current!.getBoundingClientRect().top;
            const newHeight = Math.min(Math.max(upLimit, deltaY), downLimit)
            resizeRowRef.current!.style.height = `${newHeight}px`;
        }
    };

    const handleRegenerateImg = (e: React.MouseEvent<HTMLSpanElement>, ocr_type_model: string | number) => {
        setIsLoadingImgWrapper(prevState => !prevState)
        setResetTools(prevState => !prevState)
        processImage(activeUid, ocr_type_model.toString(),
            currRotate, currCrop, imgRect)
            .then(resp => {
                updateUid(activeUid, resp.uid)
                setActiveUid(resp.uid)
                getDataById(resp.uid)
                    .then(resp => {
                        setBboxes(resp.bboxes.map((bbox, id) =>
                            ({...bbox, word: resp.text[id]})))
                        setCurrRotate(resp.angle)
                    })
                    .catch(err => {
                        console.log(err);
                    })
                getFile(resp.uid)
                    .then(resp => {
                        // setSrcImg(resp + `?${Date.now()}`)
                    })
                    .catch(err => {
                        console.log(err);
                    })
                setIsLoadingImgWrapper(prevState => !prevState)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="flex-1 px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Переименование файлов</h1>
            <div className="flex-1 flex flex-col overflow-hidden select-none"
                 onMouseUp={stopResized} onMouseLeave={stopResized} onMouseMove={handleResizeBlocks}
            >
                <GridHeader sorted filters/>
                <div className="flex-1 flex bg-mainGray overflow-hidden" ref={tableContentRef}>
                    <div className="w-1/3 h-full flex flex-col"
                         ref={resizeColRef}
                    >
                        <div className="w-full h-1/2 flex flex-col select-none" ref={resizeRowRef}>
                            <FilesBlock rows={rows.map(row =>
                                ({...row, name: convertNameFile(row.name, 35, true)}))}
                                        columns={columnsReadyFiles}
                                        rowOnClick={handleClickRow}
                            />
                        </div>
                        <div className="w-full h-[6px] cursor-row-resize border-2 border-solid border-mainDark"
                             onMouseDown={(e) => {
                                 e.preventDefault()
                                 setIsResizeRow(true)
                             }}
                        />
                        <RenameFile setRows={setRows} idTask={idTask} activeUid={activeUid}
                                    nameFile={nameFile} setNameFile={setNameFile}/>
                    </div>
                    <div className="w-[6px] h-full cursor-col-resize border-2 border-solid border-mainDark"
                         onMouseDown={(e) => {
                             e.preventDefault()
                             setIsResizeCol(true)
                         }}
                    />
                    <ImageWrapper handleClickBox={handleClickBox}
                                  myBoxes={bboxes}
                                  srcImg={srcImg}
                                  isDark={bboxes.length > 0}
                                  isRefresh isRotate isZoom isCut
                                  isLoading={isLoadingImgWrapper}
                                  handleChoseOption={handleRegenerateImg}
                                  models={models}
                                  setCurrRotate={setCurrRotate}
                                  currRotate={currRotate}
                                  setImgRect={setImgRect}
                                  imgRect={imgRect}
                                  resetTools={resetTools}
                    />
                </div>
            </div>
        </div>
    );
};

export default RenamesCurrentPage;