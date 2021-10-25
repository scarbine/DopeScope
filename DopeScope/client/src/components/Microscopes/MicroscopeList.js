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
  const [currentLocation, setCurrentLocation] = useState('');
  const user = firebase.auth().currentUser
  const gridDisplay = (location === "/microscope" ? "flex-wrap-display" : " column-display")
 

  useEffect(() => {
   
    if(location === "/microscope" ){
    getAllMicroscopes().then(setMicroscopes).then(setCurrentLocation(location))}
    else if (location === "/myscopes" || "/"){
      (getScopesByUserId(user.uid)).then(setMicroscopes).then(setCurrentLocation(location))
    }
  }, [currentLocation]);


 
  return (
    <>
    <div className="scope-container ">
      {/* <h1 className="scope-title">Scopes</h1> */}
    
      <div>

        <div className="scope-slides-wrapper">
                <h5 className="scope-slide-title">{location === "/microscope" ? "All Scopes" : "Scopes"}</h5>
                <h5 className="scope-slide-title line">________________________________________________________________________________________</h5>
            <div className="scope-slides">
        {microscopes.length !== 0 ? microscopes.map((microscope) => {
          return <MicroscopeCard key={microscope.id} microscope={microscope} />;
        }) : <div> currently no scopes </div>}
             
            </div>
            </div>
      </div>
        
      </div>
    </>
  );
};
