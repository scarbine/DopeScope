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

  const handleInputChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    const key = event.target.id
    const slideCopy = {...slide}
    slideCopy[key] = value
    setSlide({
        name : slide.name,
        description : slide.description,
        imageUrl : slide.imageUrl,
        microscopeId : slide.microscopeId        
})
}

useEffect(()=>{
  if(slideId){
    getSlideById(slideId).then(setSlide)
  }
},[])


  const submitForm = (e) => {
    e.preventDefault();
    addSlide(slide)
      .then(() => history.push("/"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  const handleCancel = () => {
      history.push("/slide")
  }

  const handleSave = () => {
    if(slideId){
      updateSlide(slide)
    } else {
      addSlide(slide)
    }
  }

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="slideName">Name</Label>
        <Input id="slideName" type="text" name="Name" onChange={handleInputChange} value={slide.name} />
      </FormGroup>
      <FormGroup>
        <Label for="slideDescription">Description</Label>
        <Input id="slideDescription" type="text" name="Description" onChange={handleInputChange} value={slide.description} />
      </FormGroup>
      <FormGroup>
        <Label for="slideImageUrl">Image Url</Label>
        <Input id="slideImageUrl" type="text" name="imageUrl" onChange={handleInputChange} value={slide.imageUrl} />
      </FormGroup>
      <FormGroup>
        <Label for="slideScope">Scope</Label>
        <Input id="slideScope" type="text" name="scope" onChange={handleInputChange} value={slide.microscopeId} />
      </FormGroup>
      <FormGroup className="slide-buttons">
        {slideId ? <Button className="slide-btn" onClick={handleSave}>Update Slide</Button> : <Button className="slide-btn" onClick={handleSave}>Add Slide</Button> }
        <Button className="slide-btn" onClick={handleCancel}>Cancel</Button>
      </FormGroup>
    </Form>
  );
}