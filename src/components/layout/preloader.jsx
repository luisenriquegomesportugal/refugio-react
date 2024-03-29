import * as React from "react";

export const Preloader = ({type = "page"}) => <div id="preloader" className={type}>
    <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
    </div>
</div>;