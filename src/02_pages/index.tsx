import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import LendingPage from "./lending";
import MainPage from "./main";
import MainCreatePage from "./main/create";
import RenamesPage from "./renames";
import RenamesCurrentPage from "./renames/current";
import ReadyPage from "./ready";
import VersionPage from "./version";
import NotFoundPage from "./notFound";

// const LendingPage = lazy(() => import('./lending'));
// const MainPage = lazy(() => import("./main"))
// const RenamesPage = lazy(() => import("./renames"))
// const ReadyPage = lazy(() => import("./ready"))
// const NotFoundPage = lazy(() => import("./notFound"))
// const MainCreatePage = lazy(() => import("./main/create"))
// const RenamesCurrentPage = lazy(() => import("./renames/current"))
// const VersionPage = lazy(() => import("./version"))

export const Routing = () => {
    return (
        <Routes>
            <Route path="" element={<LendingPage/>}/>
            <Route path="main" element={<MainPage/>}/>
            <Route path="main/create" element={<MainCreatePage/>}/>
            <Route path="renames" element={<RenamesPage/>}/>
            <Route path="renames/:idTask" element={<RenamesCurrentPage/>}/>
            <Route path="ready" element={<ReadyPage/>}/>
            <Route path="version" element={<VersionPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};