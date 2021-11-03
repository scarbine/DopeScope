import { getAllByAltText } from "@testing-library/dom";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import {
  getAllMicroscopes,
  searchScopes,
} from "../../modules/MicroscopeManager";
import { MicroscopeCard } from "./MicroscopeCard";
import { getScopesByUserId } from "../../modules/MicroscopeManager";
import firebase from "firebase";
import "./Microscope.css";
import { Image } from "cloudinary-react";
import { Transformation } from "cloudinary-react";

export const MicroscopeList = () => {
  const history = useHistory();
  const location = history.location.pathname;
  const [microscopes, setMicroscopes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const user = firebase.auth().currentUser;
  

  useEffect(() => {
    if (location === "/microscope") {
      getAllMicroscopes()
        .then(setMicroscopes)
        .then(setCurrentLocation(location));
    } else if (location === "/myscopes" || "/") {
      getScopesByUserId(user.uid)
        .then(setMicroscopes)
        .then(setCurrentLocation(location));
    }
  }, [currentLocation]);

  // const ScopeSearch = () => {
  //   let textInput = useRef();

  //   const handleSearch = () => {
  //     console.log(textInput.current.value);
  //     searchScopes(textInput.current.value).then((searchResults) =>
  //       setMicroscopes(searchResults)
  //     );

  //     const handleSearchChange = (e) => {

  //     }
  //   };

  //   return (
  //     <>

  //       <input ref={textInput} type="text" onChange={handleSearchChange}></input>
  //       <button onClick={handleSearch}>Search Scopes</button>
  //       {console.log(microscopes)}
  //     </>
  //   );
  // };

  return (
    <>
      <div className="scope-container ">
     
        <div>
          <div className="scope-slides-wrapper">
            <h5 className="scope-slide-title">
              {location === "/microscope" ? "All Scopes" : "Scopes"}
            </h5>
            {/* <ScopeSearch /> */}
            <h5 className="scope-slide-title line">
              ________________________________________________________________________________________
            </h5>
            <div className="scope-slides">
              {microscopes.length !== 0 ? (
                microscopes.map((microscope) => {
                  return (
                    <MicroscopeCard
                      key={microscope.id}
                      microscope={microscope}
                    />
                  );
                })
              ) : (
                <div> currently no scopes </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
