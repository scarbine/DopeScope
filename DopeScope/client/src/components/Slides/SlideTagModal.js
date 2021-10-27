import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getAllSlideTagsBySlideId } from '../../modules/SlideTagManager';
import { getAllTags } from '../../modules/TagManager';
import { TagCard } from '../Tags/TagsCard';
import "./Slide.css"
 
 
 export const SlideTagModal = (props) => {
    const {
      buttonLabel,
      className
    } = props;
  
    const [modal, setModal] = useState(false);

    const [tags, setTags] =useState([])
    const [slideTags, setSlideTags] =useState([])
    const [foundTag, setFoundTag] =useState([])

    useEffect(()=>{
        getAllTags().then(setTags)
        getAllSlideTagsBySlideId(props.slideId).then(setSlideTags)
        setFoundTag(slideTagCheck())
        {console.log("foundTag",foundTag)}
    },[])

    const handleTagClick = (e) => {
        e.preventDefault();
            const TagListObj = {
                slideId : props.slide.id,
                tagId : e.target.id
            }
            setFoundTag(slideTagCheck())
    }

    const slideTagCheck = () => {
        let match = [];

        for ( let i = 0; i < tags.length; i++ ) {

            for ( let e = 0; e < slideTags.length; e++ ) {
                if ( tags[i].id === slideTags[e].tagId ) {
                    console.log(tags[i].id, slideTags[e].tagId)
                    match.push(tags[i])
                }
                console.log(match)
            }
        }
        return match;
    }

    
  
    const toggle = () => setModal(!modal);
  
    return (
      <div>
        <Button color="secondary" onClick={toggle} className="slide-btn btn btn-secondary">Add Slide Tag</Button>
        <Modal isOpen={modal} toggle={toggle} className="slide-tag-modal">
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
              {console.log("tags",tags)}
              {console.log("slideTags",slideTags)}
              {console.log("foundTag",foundTag)}
              <div className="tags-container">
              {tags.map(tag => <TagCard key={tag.id} tag={tag}  handleTagClick={handleTagClick}/>)}
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