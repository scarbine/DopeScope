import firebase from "firebase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getUserByFirebaseId } from "../modules/UserManager";
import { MicroscopeList } from "./Microscopes/MicroscopeList";
import { SlideList } from "./Slides/SlideList";
import "../index.css";

export const Home = () => {
  const [user, setUser] = useState({});
  const currentUser = firebase.auth().currentUser;

  // useEffect(()=>{
  //     getUserByFirebaseId(currentUser.l).then(setUser)
  // },[])

  return (
    <>
      {console.log(currentUser.l)}
      <div className="dashboard">
        <div className="scope-slides-wrapper">
        <h3 className="dashboard-header">My Dashboard</h3>
            <SlideList />
        
        </div>
        <div className="scope-list-dashboard">
          <MicroscopeList />
        </div>
      </div>
    </>
  );
};
