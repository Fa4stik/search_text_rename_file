import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {GridHeader} from "../../../04_features/GridHeader";
import {FilesBlock, ImageWrapper, RenameFile} from "../../../04_features/RenameFiles";
import {columnsReadyFiles} from "../../../04_features/RenameFiles/model/gridStyles";
import {TRow} from "../../../05_entities/DataGrid";
import {getProcessed, TBbox} from "../../../05_entities/RenameFileFetchData";

type PageParams = {
    idTask: string
}

const RenamesCurrentPage = () => {
    const { idTask } = useParams<PageParams>()

    const [tags, setTags] = useState<string[]>([
        'Сортировка', 'ВАЕ-ТОК', 'благодарит', 'шинопроводных', 'пуско-наладку', 'электрообору',
        'дования', 'обсенечить', 'отвечающих'
    ])
    const [rows, setRows] = useState<TRow[]>([
        {id: '1', name: 'Файл №1', dateEdit: '29.09.23 15:29'},
        {id: '2', name: 'Файл №2', dateEdit: '29.09.23 15:29'},
        {id: '3', name: 'Файл №3', dateEdit: '29.09.23 15:29'},
        {id: '4', name: 'Файл №4', dateEdit: '29.09.23 15:29'},
        {id: '5', name: 'Файл №5', dateEdit: '29.09.23 15:29'},
        {id: '6', name: 'Файл №6', dateEdit: '29.09.23 15:29'},
    ])
    const [bboxes, setBboxes] = useState<TBbox[]>([])

    useEffect(() => {
        // getProcessed()
    }, []);

    const handleClickBox = (e: React.MouseEvent<HTMLDivElement>, word: string) => {
        console.log(word)
    }

    return (
        <div className="flex-grow px-[40px] pt-[25px] flex flex-col">
            <h1 className="text-3xl mb-[30px]">Файлы ожидающие изменения</h1>
            <div className="flex-grow flex flex-col">
                <GridHeader sorted filters nameHandle search/>
                <div className="flex-grow flex bg-mainGray">
                    <FilesBlock rows={rows} columns={columnsReadyFiles}/>
                    <RenameFile setRows={setRows} tags={tags}/>
                    {/*<ImageWrapper handleClickBox={handleClickBox}*/}
                    {/*              myBoxes={}*/}
                    {/*              srcImg={}*/}
                    {/*              isDark*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    );
};

export default RenamesCurrentPage;