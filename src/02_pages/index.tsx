import React, {lazy, useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

const MainPage = lazy(() => import("./main"))
const RenamesPage = lazy(() => import("./renames"))
const ReadyPage = lazy(() => import("./ready"))
const NotFoundPage = lazy(() => import("./notFound"))
const MainCreatePage = lazy(() => import("./main/create"))
const RenamesCurrentPage = lazy(() => import("./renames/current"))

export const Routing = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/main')
    }, [])

    return (
        <Routes>
            <Route path="main" element={<MainPage/>}/>
            <Route path="main/create" element={<MainCreatePage/>}/>
            <Route path="renames" element={<RenamesPage/>}/>
            <Route path="renames/:idTask" element={<RenamesCurrentPage/>}/>
            <Route path="ready" element={<ReadyPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};