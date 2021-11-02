import firebase from "firebase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getUserByFirebaseId } from "../modules/UserManager";
import { MicroscopeList } from "./Microscopes/MicroscopeList";
import { SlideList } from "./Slides/SlideList";
import "../index.css";
import { MiniSlideCardList } from "./Slides/MiniSlideCardList";


export const Home = () => {


  const[viewToggle, setViewToggle] = useState(false)
  const[view, setView] =useState(0)

  const DisplayView = () =>{
    if(view === 0){
      return <SlideList />
    }else if( view === 1) {
      return <MicroscopeList />
    }
  }

  const handleMyScopesClick = () => {
    setView(1)
    console.log(view)
  }
  const handleMySlidesClick = () => {
    setView(0)
    console.log(view)
  }
  
  useEffect(()=>{
    DisplayView()
  },[view])

  return (
    <>
     
      <div className="dashboard">
        <div className="dashboard-container-left">
        <h3 className="dashboard-header">My Dashboard</h3>
        <div className="dashboard-veiw-toggle-buttons"><h5 className="view-toggle-buttons" onClick={handleMySlidesClick}>My Slides</h5> <h5 className="view-toggle-buttons" onClick={handleMyScopesClick}>My Scopes</h5></div>
       
        {/* <div className="scope-slides-wrapper">
            <SlideList />
        </div>
        <div className="scope-list-dashboard">
          <MicroscopeList />
        </div> */}
        {DisplayView()}
        </div>
        <div className="mini-slide-list-dashboard">
  
        <MiniSlideCardList />
        </div>
      </div>
    </>
  );
};
