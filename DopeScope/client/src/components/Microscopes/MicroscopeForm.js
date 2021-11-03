import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { addMicroscope, getMicroscopesById, updateMicroscope } from "../../modules/MicroscopeManager";
import firebase from "firebase";
import "./Microscope.css";
import { getUserByFirebaseId } from "../../modules/UserManager";
import axios from "axios";
import { Image } from "cloudinary-react";
import { Transformation } from "cloudinary-react";

export const MicroscopeForm = () => {
  const history = useHistory();
  const {scopeId} = useParams();
  const [microscope, setMicroscope] = useState({});
  const [user, setUser] =useState({})
  const currentUser = firebase.auth().currentUser
  const [imageSelected, setImageSelected] = useState(null)

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

  useEffect(()=>{
    handleImageUpload()
  },[imageSelected])


  const handleCancel = () => {
    history.push("/microscope");
  };

  const handleImageUpload = () =>{

    if (imageSelected) {
      console.log("im here", imageSelected);
      const formData = new FormData();
  
      formData.append("file", imageSelected);
      formData.append("upload_preset", "dopescope");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/ddaeunjfu/image/upload",
          formData
        )
        .then((res) => {
         const newMicroscope = { ...microscope };
         newMicroscope.imageUrl = res.data.secure_url;
          setMicroscope(newMicroscope); 
        })
  }}

  const handleSave = (e) => {
    e.preventDefault();
    if(scopeId){
      updateMicroscope(microscope).then(history.push(`/microscope/${microscope.id}`))
    } else {
      getUserByFirebaseId(currentUser.l).then(setUser)
      addMicroscope(
      microscope).then(history.push('/microscope'))
    }
  };

  return (

    <>
    <div className="form-container">
      <Image className="dope-scope-logo-form" cloudName="ddaeunjfu" publicId="sldw7e2sdswxiiwnqxng.png" secure="true">
              <Transformation width="275" height="170" crop="fill"/>
              </Image>
    <Form className="new-scope-form-wrapper">
    <h1>Add New Scope</h1>
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
      <FormGroup className="image-upload-field">
      <Label for="slideImageUrl" >Uploade Scope Image</Label><br></br>
        <Input onChange={(event) => {
           return setImageSelected(event.target.files[0])
          }} type="file" name="file" id="slideImageUrl" />
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
    </div>
    </>
  );
};
