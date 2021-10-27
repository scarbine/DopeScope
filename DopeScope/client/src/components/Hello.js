import firebase from "firebase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getUserByFirebaseId } from "../modules/UserManager";
import { MicroscopeList } from "./Microscopes/MicroscopeList";
import { SlideList } from "./Slides/SlideList";
import "../index.css";
import { MiniSlideCardList } from "./Slides/MiniSlideCardList";

export const Home = () => {


  return (
    <>
     
      <div className="dashboard">
        <div className="dashboard-container-left">
        <div className="scope-slides-wrapper">
        <h3 className="dashboard-header">My Dashboard</h3>
            <SlideList />
        </div>
        <div className="scope-list-dashboard">
          <MicroscopeList />
        </div>
        </div>
        <div className="mini-slide-list-dashboard">
        <MiniSlideCardList />
        </div>
      </div>
    </>
  );
};
