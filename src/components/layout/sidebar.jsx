import * as React from "react";
import {Link, useLocation} from "react-router-dom";
import {ZenixJS} from "~theme/js/zenix.js";

export const Sidebar = () => {
    let location = useLocation();

    React.useEffect(() => {
        ZenixJS.handleCurrentActive();
    }, [location]);

    return <div className="deznav">
        <div className="deznav-scroll">
            <ul className="metismenu" id="menu">
                {/*<li className="nav-label first">Inicio</li>*/}
                {/*<li>*/}
                {/*    <Link to="/dashboard" className="ai-icon" aria-expanded="false">*/}
                {/*        <i className="flaticon-381-home"></i>*/}
                {/*        <span className="nav-text">Dashboard</span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li className="nav-label">Refukids</li>
                <li>
                    <Link to="/refukids/lista" className="ai-icon" aria-expanded="false">
                        <i className="flaticon-381-list"></i>
                        <span className="nav-text">Listar</span>
                    </Link>
                </li>
                <li>
                    <a className="has-arrow ai-icon" href="#" aria-expanded="false">
                        <i className="flaticon-381-notepad"></i>
                        <span className="nav-text">Chamada</span>
                    </a>
                    <ul aria-expanded="false">
                        <li><Link to="/turma/refubabys">Refubabys</Link></li>
                        <li><Link to="/turma/refukids1">Refukids 1</Link></li>
                        <li><Link to="/turma/refukids2">Refukids 2</Link></li>
                        <li><Link to="/turma/refuteens">Refuteens</Link></li>
                    </ul>

                </li>
                {/*<li className="nav-label">Configurações</li>*/}
                {/*<li>*/}
                {/*    <a href="#" className="ai-icon" aria-expanded="false">*/}
                {/*        <i className="flaticon-381-key"></i>*/}
                {/*        <span className="nav-text">Liberar acesso</span>*/}
                {/*    </a>*/}
                {/*</li>*/}
            </ul>
        </div>
    </div>;
};