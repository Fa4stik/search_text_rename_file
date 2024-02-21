import React from "react";

import './index.css';
import {withProviders} from "./providers";
import {Routing} from "../02_pages";
import {Notifications} from "../05_entities/Notifications";


const App = () => {
    return (
        <div className="app scrollbar h-screen max-w-screen font-rubikRg
        flex flex-col text-mainDark overflow-hidden relative">
            <Routing/>
            <Notifications/>
            {/*<Snowfall/>*/}
        </div>
    );
}

export default withProviders(App);
