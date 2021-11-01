import React from "react";
import { Link } from "react-router-dom";
import { AddTagModal } from "../Tags/AddTagModal";
import "./SideBar.css"

export const SideBar = () => {
    return(

        <>  <div className="sidebar">
            <Link className="sidebar-link" to="/slide"><div> All Slides </div></Link>
            <Link className="sidebar-link" to="/microscope"><div>All Scopes</div></Link>
            <Link className="sidebar-link" to="/slide/form"><div>Add New Slide</div></Link>
            <Link className="sidebar-link" to="/microscope/form"><div>Add Scope</div></Link>
            <AddTagModal />
            </div>
        </>
    )
}