import React from 'react';
import {dataGrid} from '../../../06_shared/ui/icon'
import {IconButton} from "../../../06_shared/ui/button";
import {IconInput} from "../../../06_shared/ui/input";

type GridHeaderProps = {
    sorted?: boolean;
    filters?: boolean;
    nameHandle?: boolean;
    search?: boolean;
    loadMore?: boolean;
}

export const GridHeader: React.FC<GridHeaderProps> =
        ({sorted,
         filters,
         search,
         nameHandle,
         loadMore}) => {

    const handleSorted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleChangeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    return (
        <div className="flex w-full bg-mainDark items-center justify-center
        rounded-t-3xl pl-[20px] pr-[5px] py-[10px]">
            {sorted && <IconButton icon={dataGrid.sorted} onClick={handleSorted}>
                Сортировка
            </IconButton>}
            {filters && <IconButton icon={dataGrid.filters} onClick={handleFilters}>
                Фильтр
            </IconButton>}
            {nameHandle && <IconInput icon={dataGrid.nameHandle}
                        onChange={handleChangeNameTask}
                        classStyle="w-[150px]"
                        classStyleIco="top-[9px]"
                        placeholder="Обработка..."/>}
            <div className="ml-auto flex">
                {search && <IconInput icon={dataGrid.search}
                            onChange={handleChangeSearch}
                            placeholder="Поиск..."/>}
                {loadMore&& <IconButton icon={dataGrid.loadMore} onClick={handleLoadMore}>
                    Загрузить ещё
                </IconButton>}
            </div>
        </div>
    );
};