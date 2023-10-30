import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GridHeader} from "../../../04_features/GridHeader";
import {FilesBlock, ImageWrapper, RenameFile} from "../../../04_features/RenameFiles";
import {columnsReadyFiles} from "../../../04_features/RenameFiles/model/gridStyles";
import {TRow} from "../../../05_entities/DataGrid";
import {getFile, getProcessed, TBbox} from "../../../05_entities/RenameFileFetchData";
import {useRenameStore} from "../../../03_widgetes/MainTable";

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
                id: id.toString(),
            })
        )
    )
    const [bboxes, setBboxes] = useState<TBbox[]>([])
    const [srcImg, setSrcImg] = useState<string>('')
    const [nameFile, setNameFile] = useState<string>('')
    const [activeUid, setActiveUid] = useState<number>(0)

    const handleClickBox = (e: React.MouseEvent<HTMLDivElement>, word: string) => {
        setNameFile(prevState => prevState + word + ' ')
    }

    const handleClickRow = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        e.preventDefault()
        const uid = parseInt(rows.find(row => row.id === id)!.uid)
        setActiveUid(uid)
        getProcessed(uid)
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
                setSrcImg(URL.createObjectURL(resp))

            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="flex-1 px-[40px] pt-[25px] flex flex-col overflow-hidden">
            <h1 className="text-3xl mb-[30px]">Файлы ожидающие изменения</h1>
            <div className="flex-1 flex flex-col overflow-hidden">
                <GridHeader sorted filters nameHandle search/>
                <div className="flex-1 flex bg-mainGray overflow-hidden">
                    <FilesBlock rows={rows} columns={columnsReadyFiles} rowOnClick={handleClickRow}/>
                    <RenameFile setRows={setRows} tags={tags} idTask={idTask} activeUid={activeUid}
                                nameFile={nameFile} setNameFile={setNameFile}/>
                    <ImageWrapper handleClickBox={handleClickBox}
                                  myBoxes={bboxes}
                                  srcImg={srcImg}
                                  isDark
                    />
                </div>
            </div>
        </div>
    );
};

export default RenamesCurrentPage;