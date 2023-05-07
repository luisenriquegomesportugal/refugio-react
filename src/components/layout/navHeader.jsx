import * as React from "react";
import {Link} from "react-router-dom";

export const NavHeader = () => <div className="nav-header">
    <Link to="/dashboard" className="brand-logo">
        <img src="/images/icone.svg" alt="logo-abbr" className="logo-abbr" width="50"
             height="50"/>
        <img src="/images/refugio.svg" alt="brand-title" className="brand-title"
             height="52"/>
    </Link>

    <div className="nav-control">
        <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </div>
    </div>
</div>;