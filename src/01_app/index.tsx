import React from "react";

import './index.css';
import {withProviders} from "./providers";
import {Routing} from "../02_pages";
import {Navigation} from "../04_features/navigation";
import {Notifications} from "../05_entities/Notifications";


const App = () => {
    return (
        <div className="app h-screen w-screen font-rubikRg
        flex flex-col text-mainDark overflow-hidden relative">
            <Navigation routing={<Routing/>}/>
            <Notifications/>
        </div>
    );
}

export default withProviders(App);
