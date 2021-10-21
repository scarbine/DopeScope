import { getAllByAltText } from "@testing-library/dom";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllMicroscopes } from "../../modules/MicroscopeManager";
import { MicroscopeCard } from "./MicroscopeCard";
import "./Microscope.css"

export const MicroscopeList = () => {
  const [microscopes, setMicroscopes] = useState([]);

  useEffect(() => {
    getAllMicroscopes().then(setMicroscopes);
  }, []);

  const history = useHistory()
 
  return (
    <>
    <div className="scope-container">
      <h1 className="scope-title">Scopes</h1>
    
      <div>
        {console.log(microscopes)}
        {microscopes.map((microscope) => {
          return <MicroscopeCard key={microscope.id} microscope={microscope} />;
        })}
      </div>
      </div>
    </>
  );
};
