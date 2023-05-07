import * as React from "react";

export const Header = () => <div className="header">
    <div className="header-content">
        <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                </div>
                <ul className="navbar-nav header-right">
                    <li className="nav-item dropdown header-profile">
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="https://arearefugio.com.br" className="dropdown-item ai-icon">
                                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger"
                                     width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                <span className="ms-2">Sair</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>;