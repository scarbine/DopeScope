import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addSlide, getSlideById, updateSlide } from "../../modules/SlideManager";
import "./Slide.css"
import { getAllMicroscopes, getScopesByUserId } from "../../modules/MicroscopeManager";
import firebase from "firebase";
import axios from "axios";


export const SlideForm = () => {
  const history = useHistory();
  const {slideId} = useParams();
  const user = firebase.auth().currentUser
  const firebaseId = user.uid
  const [imageSelected, setImageSelected] = useState(null);
  const [isUploading, setIsUploading] = useState(false)
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

useEffect(()=>{
  setIsUploading(true)
  handleImageUpload()
},[imageSelected])



  function handleCancel() {
    history.push("/slide");
  }

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
          const newSlideWithImage = { ...slide };
          newSlideWithImage.imageUrl = res.data.secure_url;
          setSlide(newSlideWithImage); 
        })
  }}

  const handleSave = () => {  
            if(slideId){
              updateSlide(slide).then(history.push(`/slide/${slide.id}`))
            } else {
              addSlide(slide).then(history.push("/slide"))
            }    
  }

  return (
    <Form className="new-slide-form">
      {console.log(slide)}
      {console.log("image" , imageSelected)}
      {console.log(isUploading)}
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
        <Label for="slideScope">Scope</Label>
       <Input id="slideScope" type="select" name="microscopeId" onChange={handleInputChange} >
         <option option id="scopeOption" name="scopeOption" onChange={handleInputChange}> Select a Scope </option>
         {scopes.map(scope=>{
           return <option id="scopeOption" name="scopeOption" value={scope.id} onChange={handleInputChange}>{scope.make} {scope.model}</option>
         })}
       </Input>
      </FormGroup>
      <FormGroup className="image-upload-field">
      <Label for="slideImageUrl" >Uploade Slide Image</Label><br></br>
        <Input onChange={(event) => {
           return setImageSelected(event.target.files[0])
          }} type="file" name="file" id="slideImageUrl" />
      </FormGroup>
      <FormGroup className="slide-buttons">
        {slideId ? <Button className="slide-btn" onClick={handleSave}>Update Slide</Button> : <Button className="slide-btn" onClick={handleSave}>Add Slide</Button> }
        <Button className="slide-btn" onClick={handleCancel}>Cancel</Button>
      </FormGroup>
    </Form>
  );
}