import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { NoteCard } from "../Notes/NotesCard";
import { deleteSlide } from "../../modules/SlideManager";
import { Button } from "reactstrap";
import { SlideCommentModal } from "./SlideCommentModal";

export const SlideDetails = () => {
  const { slideId } = useParams();
  const history = useHistory();
  const [update, setUpdate] = useState(true);
  const [slide, setSlide] = useState({
    dateCreated: "",
    name: "",
    description: "",
    magnification: "",
    microscopeId: "",
    microscope: {
      user: {
        firstName: "",
        lastName: "",
        fullName: "",
      },
    },
  });
  const [notes, setNotes] = useState([]);

  const updateList = () => {
    setUpdate(!update);
  };

  const [date] = slide?.dateCreated.split("T");

  const handleEdit = () => {
    history.push(`/slide/form/${slide.id}`);
  };

  const handleDelete = () => {
    deleteSlide(slide.id).then(history.push("/slide"));
  };

  useEffect(() => {
    getSlideById(slideId)
      .then(setSlide)
      .then(getNotesBySlideId(slideId).then(setNotes));
  }, []);

  useEffect(() => {
    getNotesBySlideId(slideId).then(setNotes);
  }, [update]);

  return (
    <>
        
        <h1 className="slide-detail-header">{slide.name}</h1>
    
      <div className="slide-detail-container">
      <section className="slide-details-column">
        <img
          className="slide-detail-img"
          src={slide.imageUrl}
          alt={slide.name}
        />
        <div className="comments-header">
      <Button className="slide-btn" onClick={handleEdit}>
        Edit Slide
      </Button>
      <Button className="slide-btn" onClick={handleDelete}>
        Delete Slide
      </Button>
         <SlideCommentModal key={slide.id} slide={slide} updateList={updateList} />
         </div>
        <h3 className="slide-comments"> Comments</h3>
        <div>
          {notes.length !== 0 ? (
            notes.map((note) => {
              return <NoteCard key={note.id} note={note} />;
            })
          ) : (
            <div>No Comments</div>
          )}
        </div>
        </section>
        <section>
        <h5>
          {slide.microscope.make} {slide.microscope.model}{" "}
        </h5>
        <h5>{slide.magnification}</h5>
        <h5>{slide.description}</h5>
        <h5>{slide.microscope.user.fullName} </h5>
        <h5>{date}</h5>
        </section>
      </div>
    </>
  );
};
