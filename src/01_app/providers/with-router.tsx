import React, {Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export const withRouter = (component: () => React.ReactNode) => () => (
    <BrowserRouter>
        <Suspense fallback={'Loading...'}>
            {component()}
        </Suspense>
    </BrowserRouter>
)