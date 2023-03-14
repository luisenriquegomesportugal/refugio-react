import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import '~theme/scss/main.scss';

import $ from 'jquery';

window.$ = $;
import * as bootstrap from 'bootstrap';
import {InitJS} from "~theme/js/init.js";

InitJS();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
