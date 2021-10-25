import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addSlide, getSlideById, updateSlide } from "../../modules/SlideManager";
import "./Slide.css"
import { getAllMicroscopes, getScopesByUserId } from "../../modules/MicroscopeManager";
import firebase from "firebase";


export const SlideForm = () => {
  const history = useHistory();
  const {slideId} = useParams();
  const user = firebase.auth().currentUser
  const firebaseId = user.uid
  const [slide, setSlide] = useState({
 
  });
  const [scopes, setScopes] = useState([])

  const handleInputChange = (e) => {
    e.preventDefault();
    const newSlide = { ...slide };
    newSlide[e.target.name] = e.target.value
    setSlide(newSlide);
    console.log(slide)
}

useEffect(()=>{
  getScopesByUserId(firebaseId).then(setScopes)
  if(slideId){
    getSlideById(slideId).then(setSlide)
  }
},[])


  const handleCancel = () => {
      history.push("/slide")
  }

  const handleSave = () => {
    if(slideId){
      updateSlide({
        id:slide.id,
        name:slide.name,
        description: slide.description,
        imageUrl: slide.imageUrl,
        microscopeId: slide.microscopeId,
        dateCreated: slide.dateCreated,
        magnification: slide.magnification

      }).then(history.push(`/slide/${slide.id}`))
    } else {
      addSlide({
        name:slide.name,
        description: slide.description,
        imageUrl: slide.imageUrl,
        microscopeId: slide.microscopeId,
        magnification: slide.magnification

      }).then(history.push("/slide"))
    }
  }

  return (
    <Form className="new-slide-form">
      {console.log(slide)}
      <FormGroup>
        <Label for="slideName">Name</Label>
        <Input id="slideName" type="text" name="name" onChange={handleInputChange} value={slide.name} />
      </FormGroup>
      <FormGroup>
        <Label for="slideDescription">Description</Label>
        <Input id="slideDescription" type="text" name="description" onChange={handleInputChange} value={slide.description} />
      </FormGroup>
      <FormGroup>
        <Label for="slideDescription">magnification</Label>
        <Input id="slideDescription" type="text" name="magnification" onChange={handleInputChange} value={slide.magnification} />
      </FormGroup>
      <FormGroup>
        <Label for="slideImageUrl">Image Url</Label>
        <Input id="slideImageUrl" type="text" name="imageUrl" onChange={handleInputChange} value={slide.imageUrl} />
      </FormGroup>
      <FormGroup>
        <Label for="slideScope">Scope</Label>
       <Input id="slideScope" type="select" name="microscopeId" onChange={handleInputChange} >
         <option option id="scopeOption" name="scopeOption" onChange={handleInputChange}> Select a Scope </option>
         {scopes.map(scope=>{
           return <option id="scopeOption" name="scopeOption" value={scope.id} onChange={handleInputChange}>{scope.make} {scope.model}</option>
         })}
       </Input>
      </FormGroup>
   
      <FormGroup className="image-upload-field">
        <Label for="slideImageUrl">Uploade Slide Image</Label><br></br>
        <Input type="file" name="file" id="slideImageUrl" />
      </FormGroup>
      <FormGroup className="slide-buttons">
        {slideId ? <Button className="slide-btn" onClick={handleSave}>Update Slide</Button> : <Button className="slide-btn" onClick={handleSave}>Add Slide</Button> }
        <Button className="slide-btn" onClick={handleCancel}>Cancel</Button>
      </FormGroup>
    </Form>
  );
}