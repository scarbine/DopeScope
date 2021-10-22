import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup, Label, Input  } from 'reactstrap';
import { addNote } from '../../modules/NotesManager';

export const SlideCommentModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [note, setNote] = useState({
      noteText:"",
      slideId : props.slide.id,
      userId : props.slide.microscope.user.id
  })

  const toggle = () => setModal(!modal);

  const handleInputChange = (e) => {
    e.preventDefault();
    const newNote = { ...note };
    newNote[e.target.name] = e.target.value
    setNote(newNote);
    console.log(note)
}

  const submit = () =>{
      
      console.log(note)
      addNote(note).then(props.updateList())
    setModal(!modal)
  }

  return (
    <div>
      
      <Button color="grey" onClick={toggle}>Comment</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Comment</ModalHeader>
        <ModalBody>
        <Form inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="NoteText" className="mr-sm-2">Comment</Label>
        <Input type="NoteText" name="noteText" id="NoteText" placeholder="Add Comment" type="textarea" onChange={handleInputChange}/>
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

