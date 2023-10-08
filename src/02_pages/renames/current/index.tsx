import React from 'react';
import {useParams} from "react-router-dom";

type PageParams = {
    idTask: string
}

const RenamesCurrentPage = () => {
    const { idTask } = useParams<PageParams>()
    return (
        <div>
            Renames current page {idTask}
        </div>
    );
};

export default RenamesCurrentPage;