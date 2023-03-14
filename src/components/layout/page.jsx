import {Link} from "react-router-dom";

export const Page = ({children, title, subTitle = null, back = null, actions = null}) =>
    <div className="container-fluid">
        <div className="row page-titles mx-0">
            {back && <div className="col-1 d-flex justify-content-center align-items-center">
                <Link to={back}>
                    <i className="fa fa-2x fa-arrow-left"></i>
                </Link>
            </div>
            }
            <div className="col">
                <div className="row">
                    <div className="col-sm-6 p-md-0">
                        <div className="welcome-text">
                            <h4>{title}</h4>
                            {subTitle && <span>{subTitle}</span>}
                        </div>
                    </div>
                    {actions && <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        {actions}
                    </div>}
                </div>
            </div>
        </div>
        {children}
    </div>;