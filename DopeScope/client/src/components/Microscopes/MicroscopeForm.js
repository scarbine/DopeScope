import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addMicroscope } from "../../modules/MicroscopeManager";
import { addQuote } from "../modules/quoteManager";

export const MicroscopeForm = () => {
  const history = useHistory();
  const [microscope, setMicroscope] = useState({
      make:"",
      model : "",
      userid : ""
  });

  const handleInputChange = (event) => {
    event.preventDefault()
    const value = event.target.value
    const key = event.target.id
    const microscopeCopy = {...post}
    microscopeCopy[key] = value
    setMicroscope({
        make: microscopeCopy.title,
        model: microscopeCopy.content
})
}


  const submitForm = (e) => {
    e.preventDefault();
    addMicroscope(microscope)
      .then(() => history.push("/"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="quoteText">Make</Label>
        <Input id="quoteText" type="text" name="Make" onChange={handleInputChange} value={microscope.make} />
      </FormGroup>
      <FormGroup>
        <Label for="quoteText">Model</Label>
        <Input id="quoteText" type="text" name="Model" onChange={handleInputChange} value={microscope.model} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}