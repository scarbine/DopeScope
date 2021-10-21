import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addSlide, getSlideById, updateSlide } from "../../modules/SlideManager";
import "./Slide.css"


export const SlideForm = () => {
  const history = useHistory();
  const {slideId} = useParams();
  const [slide, setSlide] = useState({
 
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const newSlide = { ...slide };
    newSlide[e.target.name] = e.target.value
    setSlide(newSlide);
}

useEffect(()=>{
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

      }).then(history.push("/slide"))
    } else {
      addSlide({
        name:slide.name,
        description: slide.description,
        imageUrl: slide.imageUrl,
        microscopeId: slide.microscopeId,
        dateCreated: slide.dateCreated,
        magnification: slide.magnification

      })
    }
  }

  return (
    <Form >
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
        <Input id="slideScope" type="text" name="microscopeId" onChange={handleInputChange} value={slide.microscopeId} />
      </FormGroup>
   
      <FormGroup className="slide-buttons">
        {slideId ? <Button className="slide-btn" onClick={handleSave}>Update Slide</Button> : <Button className="slide-btn" onClick={handleSave}>Add Slide</Button> }
        <Button className="slide-btn" onClick={handleCancel}>Cancel</Button>
      </FormGroup>
    </Form>
  );
}