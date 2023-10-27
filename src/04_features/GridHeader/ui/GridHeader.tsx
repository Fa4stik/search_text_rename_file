import React from 'react';
import {dataGrid} from '../../../06_shared/ui/icon'
import {IconButton} from "../../../06_shared/ui/button";
import {IconInput} from "../../../06_shared/ui/input";
import {ESizes} from "../model/sizes";
import {TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable/model/types";
import {TRow} from "../../../05_entities/DataGrid";

type GridHeaderProps = {
    sorted?: boolean;
    filters?: boolean;
    nameHandle?: boolean;
    handleChangeNameTask?: (e: React.ChangeEvent<HTMLInputElement>) => void
    valueTask?: string
    search?: boolean;
    loadMore?: boolean;
    size?: ESizes;
}

export const GridHeader: React.FC<GridHeaderProps> =
        ({sorted,
         filters,
         search,
         nameHandle,
            handleChangeNameTask,
             valueTask,
         loadMore,
         size}) => {

    const handleSorted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    if (size === ESizes.XL) {
        return (
            <div className="flex w-full bg-mainDark items-center justify-center
        rounded-t-3xl pl-[20px] pr-[5px] py-[5px]">
                {sorted && <IconButton icon={dataGrid.sorted} onClick={handleSorted}
                                       imgSize="15px"
                                       classStyles="text-[15px]"
                >
                    Сортировка
                </IconButton>}
                {filters && <IconButton icon={dataGrid.filters} onClick={handleFilters}
                                        imgSize="15px"
                                        classStyles="text-[15px]"
                >
                    Фильтр
                </IconButton>}
                {nameHandle && <IconInput icon={dataGrid.nameHandle}
                                          onChange={handleChangeNameTask!}
                                          value={valueTask}
                                          classStyle="w-[150px]"
                                          classStyleIco="top-[9px]"
                                          placeholder="Обработка..."/>}
                <div className="ml-auto flex">
                    {search && <IconInput icon={dataGrid.search}
                                          onChange={handleChangeSearch}
                                          classStyle="text-[13px] pr-[19px]"
                                          inlineStyles={{
                                              width: '100px'
                                          }}
                                          value={''}
                                          classStyleIco="w-[14px] top-[2px]"
                                          placeholder="Поиск..."/>}
                    {loadMore&& <IconButton icon={dataGrid.loadMore} onClick={handleLoadMore}>
                        Загрузить ещё
                    </IconButton>}
                </div>
            </div>
        )
    }

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
                        onChange={handleChangeNameTask!}
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