import {Link} from "react-router-dom";
import {Preloader} from "./preloader.jsx";
import * as React from "react";
import Skeleton from "react-loading-skeleton";

export const Page = ({children, title, subTitle, back, actions, loading}) => <div className="container-fluid">
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
                        {
                            subTitle !== undefined
                                ? !subTitle
                                    ? <Skeleton width="100px"/>
                                    : <span>{subTitle}</span>
                                : null
                        }
                    </div>
                </div>
                {
                    actions !== undefined
                        ? <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                            {
                                !actions
                                    ? <Skeleton width="100px" count={2}/>
                                    : actions
                            }
                        </div>
                        : null
                }
            </div>
        </div>
    </div>
    {
        loading
            ? <div className="card">
                <div className="card-body">
                    <Skeleton height="50px"/>
                </div>
            </div>
            : children
    }
</div>;