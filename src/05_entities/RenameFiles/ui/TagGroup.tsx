import React, {useEffect, useRef, useState} from 'react';
import {TGroupTag, TTag} from "../../FetchTags";
import {dataGrid, tagsIcons} from "../../../06_shared/ui/icon";
import {useSpring} from "react-spring";

type TagGroupProps = {
    name: string
    tags: TGroupTag
    handleSetTag?: (newTag: string) => void
    isDeleteTag?: boolean
    isAddTag?: boolean
    handleClickTag: (tag: string) => void
    handleDelTag?: (tag: number) => void
    isShowTags?: boolean
    validator?: (value: string) => string
    count?: number,
    lengthName?: number
    isSorted?: boolean
    isResize?: boolean
}

export const TagGroup: React.FC<TagGroupProps> = ({
    name,
    isDeleteTag,
    isAddTag,
    tags,
    handleSetTag,
    handleDelTag,
    handleClickTag,
    isShowTags, validator, count,
    lengthName,
    isSorted,
    isResize
}) => {

    const [isShowInput, setIsShowInput] =
        useState<boolean>(false)
    const [localTags, setLocalTags] =
        useState<TTag[]>(tags.content ?? [])
    const [reverseSorted, setReverseSorted] =
        useState(false)
    const [maxHeightTagsContent, setMaxHeightTagsContent] =
        useState<string>('256px')

    const inpRef = useRef<HTMLInputElement>(null)
    const svgArrowRef = useRef<SVGSVGElement>(null)
    const contTagRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        inpRef.current && inpRef.current.focus()
    }, [isShowInput]);

    useEffect(() => {
        const {scrollHeight, clientHeight} = contTagRef.current!
        if (scrollHeight > clientHeight) {
            contTagRef.current!.style.borderBottomRightRadius = "0px"
        }
    }, []);

    const handleClickSorted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        localTags.sort((a, b) => reverseSorted
            ? a.tag.localeCompare(b.tag)
            : b.tag.localeCompare(a.tag)
        )
        setReverseSorted(prevState => !prevState)
    };

    const handleTurnHeight = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMaxHeightTagsContent(prevState => prevState === '256px'
            ? '100%'
            : '256px'
        )
    }

    return (
        <div>
            <div className="bg-mainDark rounded-t-2xl text-white px-4 py-1 flex">
                <h3>{name}</h3>
                {isSorted &&
                    <button className="mx-2 w-5" onClick={handleClickSorted}>
                        <img src={dataGrid.sorted} alt="Sorted"/>
                    </button>}
                {isResize &&
                    <button className="w-5" onClick={handleTurnHeight}>
                        <img src={tagsIcons.height} alt="Resize height"/>
                    </button>
                }
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                     width="24" className="fill-mainGray ml-auto transition-all origin-center ease-in-out duration-500"
                     ref={svgArrowRef}
                     onClick={() => {
                         const currRotate = svgArrowRef.current!.style.rotate
                         if (currRotate === '-180deg') {
                             svgArrowRef.current!.style.rotate = '0deg'
                             contTagRef.current!.style.maxHeight = '500px'
                             contTagRef.current!.style.padding = '10px'
                         } else {
                             svgArrowRef.current!.style.rotate = '-180deg'
                             contTagRef.current!.style.maxHeight = '0px'
                             contTagRef.current!.style.padding = '0px'
                         }
                     }}
                >
                    <path d="M480-360 280-560h400L480-360Z"/>
                </svg>
            </div>
            <div className="flex flex-wrap flex-grow border-[2px] items-center transition-all ease-in-out duration-500
                            border-solid border-mainDark rounded-b-3xl p-[10px] gap-[5px] relative
                            overflow-y-auto"
                 style={{
                     maxHeight: maxHeightTagsContent
                 }}
                 ref={contTagRef}
            >
                    <>
                        {localTags.map((tag, id) => count
                            ? id < count && (
                                <div key={id} className="bg-mainTags/[0.3] py-[2px] px-[7px]
                                        rounded-2xl cursor-pointer relative"
                                     onClick={(e) => handleClickTag(tag.tag)}
                                >
                                {tag.tag}
                                {isDeleteTag &&
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24"
                                         className="absolute right-0 top-0 h-[10px] w-[10px] fill-mainDark"
                                         onClick={e => {
                                             e.stopPropagation()
                                             handleDelTag && handleDelTag(tag.uid)
                                             setLocalTags(prevState => prevState.filter(t => t !== tag))
                                         }}
                                    >
                                        <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144
                                    144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
                                    127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127
                                    85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227
                                    93Zm0-320Z"/>
                                    </svg>}
                            </div>)
                            : <div key={id} className="bg-mainTags/[0.3] py-[2px] px-[10px]
                                        rounded-2xl cursor-pointer relative"
                                   onClick={(e) => handleClickTag(tag.tag)}
                            >
                            {tag.tag}
                            {isDeleteTag &&
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                     className="absolute left-0 top-0 h-[10px] w-[10px] fill-mainDark"
                                     onClick={e => {
                                         e.stopPropagation()
                                         handleDelTag && handleDelTag(tag.uid)
                                         setLocalTags(prevState => prevState.filter(t => t !== tag))
                                     }}
                                >
                                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144
                                    144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
                                    127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127
                                    85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227
                                    93Zm0-320Z"/>
                                </svg>}
                        </div>
                        )}
                        {isAddTag &&
                            <>
                                {isShowInput &&
                                    <div className="bg-mainTags/[0.3] py-[2px] px-[7px]
                                rounded-2xl cursor-pointer relative">
                                        <input type="text" className="outline-none border-none bg-transparent w-1"
                                               ref={inpRef}
                                               onChange={(e) => {
                                                   if (lengthName && e.target.value.length >= lengthName+1) {
                                                       e.target.value = e.target.value.slice(0, -1)
                                                       return
                                                   }

                                                   if (validator)
                                                       e.target.value = validator(e.target.value);
                                               }}
                                               onInput={(e) => {
                                                   inpRef.current!.style.width = inpRef.current!.scrollWidth + 'px';
                                               }}
                                               onKeyDown={(e) => {
                                                   if (e.key === 'Backspace')
                                                       setTimeout(() => {
                                                           inpRef.current!.style.width = inpRef.current!.value.length + 1 + 'ch';
                                                       }, 0)
                                               }}
                                               onBlur={(e) => {
                                                   if (!e.target.value) {
                                                       setIsShowInput(false)
                                                       return
                                                   }

                                                   setLocalTags(prevState => [...prevState, {
                                                       tag: e.target.value,
                                                       group_id: tags.uid,
                                                       uid: tags?.content?.length+1 ?? 1
                                                   }])
                                                   handleSetTag && handleSetTag(e.target.value)
                                                   setIsShowInput(prevState => !prevState)
                                               }}
                                        />
                                    </div>}
                                {count
                                    ? localTags.length < count && (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                         width="24"
                                         className="fill-mainDark cursor-pointer"
                                         onClick={() => {
                                             setIsShowInput(prevState => !prevState)
                                         }}
                                    >
                                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83
                                0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
                                127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5
                                156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134
                                0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>
                                )
                                    : <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                           width="24"
                                           className="fill-mainDark cursor-pointer"
                                           onClick={() => {
                                               setIsShowInput(prevState => !prevState)
                                           }}
                                    >
                                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83
                                0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
                                127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5
                                156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134
                                0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                    </svg>
                                }
                            </>
                        }
                    </>
                {isShowTags && tags.content.length === 0 && <p className="w-full text-center">Тегов не найдено</p>}
            </div>
        </div>
    );
};