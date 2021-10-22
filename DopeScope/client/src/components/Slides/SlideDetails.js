import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { NoteCard } from "../Notes/NotesCard";
import { deleteSlide } from "../../modules/SlideManager";
import { Button } from "reactstrap";
import { SlideCommentModal } from "./SlideCommentModal";
import { SlideList } from "./SlideList";

export const SlideDetails = () => {
  const { slideId } = useParams();
  const history = useHistory();
  const location = history.location.pathname
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
  }, [location]);

  useEffect(() => {
    getNotesBySlideId(slideId).then(setNotes);
  }, [update]);

  return (
    <>
        
    
      <div className="slide-detail-container">
      <section className="slide-details-column">
        <h1 className="slide-detail-header">{slide.name}</h1>
        <div className="image-container">
        <img
          className="slide-detail-img"
          src={slide.imageUrl}
          alt={slide.name}
        />
        </div>
        <div classname="sub-image-info">
            <div> {slide.microscope.make} {slide.microscope.model}</div>
            <div>{slide.microscope.user.fullName} </div>
        </div>
        <div className="comments-header">
      <Button className="slide-btn" onClick={handleEdit}>
        Edit Slide
      </Button>
      <Button className="slide-btn" onClick={handleDelete}>
        Delete Slide
      </Button>
         <SlideCommentModal key={slide.id} slide={slide} updateList={updateList} />
         </div>
        <section className="slide-detail-info-container">
        <h5>
        </h5>
        <h5>Magnifiaction: {slide.magnification}</h5>
        <h5>Description :{slide.description}</h5>
        <h5>{date}</h5>
        </section>
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
        <SlideList />
      </div>
    </>
  );
};
