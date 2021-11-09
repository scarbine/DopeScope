import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import { getAllMicroscopes } from "../../modules/MicroscopeManager";
import { MicroscopeCard } from "./MicroscopeCard";
import { getScopesByUserId } from "../../modules/MicroscopeManager";
import firebase from "firebase";
import "./Microscope.css";

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

  return (
    <>
      <div className="scope-container ">
        <div>
          <div className="scope-slides-wrapper">
            <h3 className="scope-slide-title"></h3>

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
