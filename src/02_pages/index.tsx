import React, {lazy, useMemo} from 'react';
import {Route, Routes} from 'react-router-dom';
import LendingPage from "./lending";
import MainPage from "./main";
import MainCreatePage from "./main/create";
import RenamesPage from "./renames";
import RenamesCurrentPage from "./renames/current";
import ReadyPage from "./ready";
import VersionPage from "./version";
import NotFoundPage from "./notFound";
import {AuthPage} from "./auth";
import {MainHeader} from "../04_features/MainHeader";

// const LendingPage = lazy(() => import('./lending'));
// const MainPage = lazy(() => import("./main"))
// const RenamesPage = lazy(() => import("./renames"))
// const ReadyPage = lazy(() => import("./ready"))
// const NotFoundPage = lazy(() => import("./notFound"))
// const MainCreatePage = lazy(() => import("./main/create"))
// const RenamesCurrentPage = lazy(() => import("./renames/current"))
// const VersionPage = lazy(() => import("./version"))

type TRoute = {
    path: string
    element: React.ReactElement
}

export const Routing = () => {
    const routes = useMemo<TRoute[]>(() =>
        [
            {path: 'main', element: <MainPage/>},
            {path: 'main/create', element: <MainCreatePage/>},
            {path: 'renames', element: <RenamesPage/>},
            {path: 'renames/:idTask', element: <RenamesCurrentPage/>},
            {path: 'ready', element: <ReadyPage/>},
            {path: 'version', element: <VersionPage/>},
            {path: '*', element: <NotFoundPage/>},
        ], [])

    return (
        <Routes>
            <Route path="" element={<LendingPage/>}/>
            <Route path="auth" element={<AuthPage/>}/>
            {routes.map((route, id) => (
                <Route path={route.path}
                       key={id+route.path}
                       element={<MainHeader element={route.element}/>}
                />
            ))}
        </Routes>
    );
};