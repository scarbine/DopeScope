import { getAllByAltText } from "@testing-library/dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllMicroscopes } from "../../modules/MicroscopeManager";
import { MicroscopeCard } from "./MicroscopeCard";
import { getScopesByUserId } from "../../modules/MicroscopeManager";
import { getUserByFirebaseId } from "../../modules/UserManager";
import firebase from "firebase";
import "./Microscope.css"

export const MicroscopeList = () => {
  const history = useHistory()
  const location = history.location.pathname
  const [microscopes, setMicroscopes] = useState([]);
  const user = firebase.auth().currentUser
 

  useEffect(() => {
   
    if(location === "/microscope"){
    getAllMicroscopes().then(setMicroscopes)}
    else if (history.location.pathname === "/myscopes"){
      (getScopesByUserId(user.uid)).then(setMicroscopes)
    }
  }, [location]);


 
  return (
    <>
    <div className="scope-container">
      <h1 className="scope-title">Scopes</h1>
    
      <div>
        {console.log(microscopes)}
        {console.log(user.uid)}
        {microscopes.map((microscope) => {
          return <MicroscopeCard key={microscope.id} microscope={microscope} />;
        })}
      </div>
      </div>
    </>
  );
};
