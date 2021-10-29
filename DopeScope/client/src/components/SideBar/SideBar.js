import React from "react";
import { Link } from "react-router-dom";
import { AddTagModal } from "../Tags/AddTagModal";
import "./SideBar.css"

export const SideBar = () => {
    return(

        <>  <div className="sidebar">
            <Link className="sidebar-link" to="/slide"> All Slides</Link>
            <Link className="sidebar-link" to="/microscope">All Scopes</Link>
            <Link className="sidebar-link" to="/slide/form">Add New Slide</Link>
            <Link className="sidebar-link" to="/microscope/form">Add Scope</Link>
            <AddTagModal />
            </div>
        </>
    )
}