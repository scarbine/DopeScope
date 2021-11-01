import React from "react";
import { Link } from "react-router-dom";
import { AddTagModal } from "../Tags/AddTagModal";
import "./SideBar.css"

export const SideBar = () => {
    return(

        <>  <div className="sidebar">
            <Link className="sidebar-link" to="/slide"><h5> All Slides </h5></Link>
            <Link className="sidebar-link" to="/microscope"><h5>All Scopes</h5></Link>
            <Link className="sidebar-link" to="/slide/form"><h5>Add New Slide</h5></Link>
            <Link className="sidebar-link" to="/microscope/form"><h5>Add Scope</h5></Link>
            <AddTagModal />
            </div>
        </>
    )
}