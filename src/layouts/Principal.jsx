import React from 'react';
import {Preloader} from "../components/layout/preloader.jsx";
import {NavHeader} from "../components/layout/navHeader.jsx";
import {Header} from "../components/layout/header.jsx";
import {Sidebar} from "../components/layout/sidebar.jsx";
import {Outlet} from "react-router-dom";

export const Principal = () => <>
    <Preloader />
    <div id="main-wrapper">
        <NavHeader />
        <Header />
        <Sidebar />
        <div className="content-body">
            <Outlet />
        </div>
    </div>
</>;