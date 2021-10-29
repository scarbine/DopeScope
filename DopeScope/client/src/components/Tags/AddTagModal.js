import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input  } from 'reactstrap';
import { addTag } from '../../modules/TagManager';

export const AddTagModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [tag, setTag] = useState({})

  const toggle = () => setModal(!modal);

  const handleInputChange = (e) => {
    e.preventDefault();
    const newTag = { ...tag };
    newTag[e.target.name] = e.target.value
    setTag(newTag);
    console.log(tag)
}

  const submit = () =>{
      
      console.log(tag)
      addTag(tag)
      setModal(!modal)
 
  }

  return (
    <div>
      
      <div onClick={toggle} className="sidebar-link add-tag-button">Add Tag</div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Tag</ModalHeader>
        <ModalBody>
        <Form inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="Tag" className="mr-sm-2">Tag</Label>
        <Input type="Tag" name="tagName" id="tagName" placeholder="Add Tag" type="text" onChange={handleInputChange}/>
      </FormGroup>
    </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submit}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

