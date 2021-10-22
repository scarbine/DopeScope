import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css"

export const SideBar = () => {
    return(

        <>  <div className="sidebar">
            <Link className="sidebar-link" to="/slide"> All Slides</Link>
            <Link className="sidebar-link" to="/myslides">My Slides</Link>
            <Link className="sidebar-link" to="/microscope">All Scopes</Link>
            <Link className="sidebar-link" to="/myscopes">My Scopes</Link>
            <Link className="sidebar-link" to="/slide/form">Add New Slide</Link>
            <Link className="sidebar-link" to="/microscope/form">Add Scope</Link>
            </div>
        </>
    )
}