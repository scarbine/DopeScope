import React, { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getAllSlideTagsBySlideId } from "../../modules/SlideTagManager";
import { getAllTags } from "../../modules/TagManager";
import { TagCard } from "../Tags/TagsCard";
import "./Slide.css";

export const SlideTagModal = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const [tags, setTags] = useState([]);
  const [slideTags, setSlideTags] = useState([]);

  const { slideId } = useParams();
  let foundTag = {};
  useEffect(() => {
    getAllTags().then(setTags);
    getAllSlideTagsBySlideId(props.slideId).then(setSlideTags);
  }, [props.slideTagModalToggle]);

  const toggle = () => {
    setModal(!modal);
    props.toggleSlideTagModal();
  };

  return (
    <div>
      <Button
        color="secondary"
        onClick={toggle}
        className="slide-btn btn btn-secondary"
      >
        Add Slide Tag
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="slide-tag-modal">
        <ModalHeader className="slide-tag-modal-header" toggle={toggle}>
          Slide Tags
        </ModalHeader>
        <ModalBody>
          <div className="tags-container">
            {tags.map((tag) => {
              let isActive = false;
              foundTag = slideTags.find(
                (slideTag) => slideTag.tagId === tag.id
              );

              if (foundTag !== undefined) {
                isActive = true;
              }

              return (
                <TagCard
                  key={tag.id}
                  tag={tag}
                  slideId={slideId}
                  tags={tags}
                  foundTag={foundTag}
                  isActive={isActive}
                  slideTags={slideTags}
                  setSlidetags={setSlideTags}
                />
              );
            })}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Done
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};
