import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllTags } from '../../modules/TagManager';
import "./Slide.css"
 
 
 export const SlideTagModal = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);

    const [tags, setTags] =useState([])

    useEffect(()=>{
        getAllTags().then(setTags)
    },[])
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="secondary" onClick={toggle} className="slide-btn btn btn-secondary">Add Slide Tag</Button>
        <Modal isOpen={modal} toggle={toggle} className="slide-tag-modal">
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
              {console.log(tags)}
              <div className="tags-container">
              {tags.map(tag => <div className="tag-card">{tag.tagName}</div>)}
              </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }