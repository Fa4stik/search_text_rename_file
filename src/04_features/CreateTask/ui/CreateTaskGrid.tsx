import React from 'react';
import {GridHeader} from "../../GridHeader";
import {columnsCreateTask} from "../../../03_widgetes/CreateTaskBlockInfo/model/gridStyles";
import {BodyGrid, TContextMenuTypeParams, TRow} from "../../../05_entities/DataGrid";
import {TImage} from "../../../05_entities/CreateTaskForm";

type CreateTaskGridProps = {
    images: TImage[]
    setImages: React.Dispatch<React.SetStateAction<TImage[]>>
    isLocalPath: boolean
}

export const CreateTaskGrid:
    React.FC<CreateTaskGridProps> = ({images,
                                         setImages,
                                         isLocalPath}) => {

    const handleDeleteContext = (e: React.MouseEvent<HTMLDivElement>, idCell: string) => {
        e.preventDefault()
        setImages(prevState =>
            prevState.filter(image => image.id !== idCell)
        )
    }

    const contextMenu: TContextMenuTypeParams = {
        cordY: isLocalPath ? 300 : 350,
        cordX: 120,
        contextMenuRow: [
            {id: 1, name: 'Удалить', onClick: handleDeleteContext}
        ]
    }

    return (
        <div className="flex-grow flex flex-col overflow-hidden">
            {/*release load more function*/}
            <GridHeader sorted/>
            <BodyGrid width={'100%'}
                      columns={columnsCreateTask}
                      rows={images.map((image, id) =>
                          ({id: image.id, name: image.name}))}
                      classStyles="bg-white"
                      contextMenuOptionals={contextMenu}
            />
        </div>
    );
};