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
  const handleClick = () => {
      history.push("microscope/form")
  }
  return (
    <>
      <h1>Scopes</h1>
      <Button  className="scope-btn" onClick={handleClick}>Add Scope</Button>
      <div>
        {console.log(microscopes)}
        {microscopes.map((microscope) => {
          return <MicroscopeCard key={microscope.id} microscope={microscope} />;
        })}
      </div>
    </>
  );
};
