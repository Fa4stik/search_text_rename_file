import React, {useEffect, useState} from 'react';
import {dataGrid} from '../../../06_shared/ui/icon'
import {IconButton} from "../../../06_shared/ui/button";
import {IconInput} from "../../../06_shared/ui/input";
import {ESizes} from "../model/sizes";
import {TRenameFile, TRowMain, TRowReady, TRowRename} from "../../../03_widgetes/MainTable";

type TRow = TRowMain | TRowRename | TRowReady | TRenameFile;


type GridHeaderProps = {
    sorted?: boolean;
    filters?: boolean;
    nameHandle?: boolean;
    search?: boolean;
    loadMore?: boolean;
    size?: ESizes;
    activeRowId?: string
    rows?: TRow[]
    sortedFn?: (compareFn: (a: TRow, b: TRow) => number) => void
}

export const GridHeader: React.FC<GridHeaderProps> = ({
    sorted,
    filters,
    search,
    nameHandle,
    loadMore,
    size,
    activeRowId,
    rows,
    sortedFn
}) => {

    const [valueHandle, setValueHandle] = useState<string>('')
    const [valueSearch, setValueSearch] = useState<string>('')
    const [reverseSorted, setReverseSorted] =
        useState(false)

    const handleSorted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (rows && sortedFn) {
            sortedFn((a, b) => reverseSorted
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            )
            setReverseSorted(prevState => !prevState)
        }
    };

    const handleFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleLoadMore = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    const handleChangeNameTask = (e: React.ChangeEvent<HTMLInputElement>) => {

    };

    useEffect(() => {
        if (rows) {
            const name = rows.find((row: TRow) => 'id' in row && row.id === activeRowId)?.name;
            setValueHandle(name as string)
        }
    }, [activeRowId]);

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
                                          onChange={handleChangeNameTask}
                                          value={valueHandle}
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
                                          value={valueSearch}
                                          classStyleIco="w-[14px] top-[2px]"
                                          placeholder="Поиск..."/>}
                    {loadMore && <IconButton icon={dataGrid.loadMore} onClick={handleLoadMore}>
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
                                      value={valueHandle}
                                      onChange={handleChangeNameTask!}
                                      classStyle="w-[150px]"
                                      classStyleIco="top-[9px]"
                                      placeholder="Обработка..."/>}
            <div className="ml-auto flex">
                {search && <IconInput icon={dataGrid.search}
                                      value={valueSearch}
                                      onChange={handleChangeSearch}
                                      placeholder="Поиск..."/>}
                {loadMore && <IconButton icon={dataGrid.loadMore} onClick={handleLoadMore}>
                    Загрузить ещё
                </IconButton>}
            </div>
        </div>
    );
};