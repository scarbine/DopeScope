import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addMicroscope, getMicroscopesById, updateMicroscope } from "../../modules/MicroscopeManager";
import firebase from "firebase";
import "./Microscope.css";
import { getUserByFirebaseId } from "../../modules/UserManager";

export const MicroscopeForm = () => {
  const history = useHistory();
  const {scopeId} = useParams();
  const [microscope, setMicroscope] = useState({});
  const [user, setUser] =useState({})
  const currentUser = firebase.auth().currentUser

  const handleInputChange = (e) => {
    e.preventDefault();
    const newMicroscope = { ...microscope };
    newMicroscope[e.target.name] = e.target.value
    setMicroscope(newMicroscope);
  };

  useEffect(() => {
    if(scopeId){
      getMicroscopesById(scopeId).then(setMicroscope)}
  },[])


  const handleCancel = () => {
    history.push("/microscope");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(scopeId){
      updateMicroscope({
        id: microscope.id,
        make: microscope.make,
        model: microscope.model,
        userId: microscope.userId,
        imageUrl : microscope.imageUrl
      }).then(history.push(`/microscope/${microscope.id}`))
    } else {
      getUserByFirebaseId(currentUser.l).then(setUser)
      addMicroscope({
        id: microscope.id,
        make: microscope.make,
        model: microscope.model,
        userId: user.id,
        imageUrl : microscope.imageUrl
      }).then(history.push('/microscope'))
    }
  };

  return (
    <Form >
    {console.log(currentUser.l)}
      <FormGroup>
        <Label for="quoteText">Make</Label>
        <Input
          id="quoteText"
          type="text"
          name="make"
          onChange={handleInputChange}
          value={microscope.make}
        />
      </FormGroup>
      <FormGroup>
        <Label for="quoteText">Model</Label>
        <Input
          id="quoteText"
          type="text"
          name="model"
          onChange={handleInputChange}
          value={microscope.model}
        />
      </FormGroup>
      <FormGroup>
        <Label for="imageUrl">Image Url</Label>
        <Input
          id="imageUrl"
          type="text"
          name="imageUrl"
          onChange={handleInputChange}
          value={microscope.imageUrl}
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
