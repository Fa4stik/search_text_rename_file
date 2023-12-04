import React from "react";

import './index.css';
import {withProviders} from "./providers";
import {Routing} from "../02_pages";
import {Navigation} from "../04_features/navigation";


const App = () => {
    return (
        <div className="app h-screen w-screen font-rubikRg
        flex flex-col text-mainDark overflow-hidden">
            <Navigation routing={<Routing/>}/>
        </div>
    );
}

export default withProviders(App);
