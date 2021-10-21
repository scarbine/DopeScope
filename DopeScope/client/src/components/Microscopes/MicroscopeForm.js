import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addMicroscope, getMicroscopesById, updateMicroscope } from "../../modules/MicroscopeManager";
import "./Microscope.css";

export const MicroscopeForm = () => {
  const history = useHistory();
  const {scopeId} = useParams();
  const [microscope, setMicroscope] = useState({
    make: "",
    model: "",
    userid: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const key = event.target.id;
    const microscopeCopy = { ...microscope };
    microscopeCopy[key] = value;
    setMicroscope({
      make: microscopeCopy.title,
      model: microscopeCopy.content,
    });
  };

  useEffect(() => {
    if(scopeId){
      getMicroscopesById(scopeId).then(setMicroscope)}
  },[])

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   addMicroscope(microscope)
  //     .then(() => history.push("/"))
  //     .catch((err) => alert(`An error ocurred: ${err.message}`));
  // };

  const handleCancel = () => {
    history.push("/microscope");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(scopeId){
      updateMicroscope(microscope)
    } else {
      addMicroscope(microscope)
    }
  };

  return (
    <Form >
      <FormGroup>
        <Label for="quoteText">Make</Label>
        <Input
          id="quoteText"
          type="text"
          name="Make"
          onChange={handleInputChange}
          value={microscope.make}
        />
      </FormGroup>
      <FormGroup>
        <Label for="quoteText">Model</Label>
        <Input
          id="quoteText"
          type="text"
          name="Model"
          onChange={handleInputChange}
          value={microscope.model}
        />
      </FormGroup>
      <FormGroup>
        { scopeId ? <Button className="scope-btn" onClick={handleSave}>
          Update Scope
        </Button> : <Button className="scope-btn" onClick={handleSave}> Add New Scope </Button> }
        <Button className="scope-btn" onClick={handleCancel}>
          Cancel
        </Button>
      </FormGroup>
    </Form>
  );
};
