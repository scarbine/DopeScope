import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { NoteCard } from "../Notes/NotesCard";
import { deleteSlide } from "../../modules/SlideManager";
import { Button } from "reactstrap";
import { SlideCommentModal } from "./SlideCommentModal";
import { SlideList } from "./SlideList";
import { addLike, deleteLike, getSlideLikes } from "../../modules/Likemanager";
import firebase from "firebase";
import { getSlideLikeByUser } from "../../modules/Likemanager";
import { getAllSlideTagsBySlideId } from "../../modules/SlideTagManager";
import { SlideTagCard } from "./SlideTagCard";
import { SlideTagModal } from "./SlideTagModal";
import { getUserByFirebaseId } from "../../modules/UserManager";

export const SlideDetails = () => {
  const { slideId } = useParams();
  const history = useHistory();
  const location = history.location.pathname;
  const [update, setUpdate] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likeToggle, setLikeToggle] = useState(false);
  const user = firebase.auth().currentUser;
  const firebaseId = user.uid;
  const [userLike, setUserLike] = useState(undefined);
  const [slideTags, setSlideTags] = useState([]);
  const [currrentUserObj, setCurrentUserObj] = useState({});
  const [slideTagModal, setSlideTagModal] = useState(null);
  const [slideTagModalToggle, setSlideTagModalToggle] = useState(false);
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

  const handleDelete = (e) => {
    e.preventDefault();
    deleteSlide(slide.id).then(history.push("/slide"));
  };

  const handleAddLike = (e) => {
    e.preventDefault();
    const likeObj = {
      slideId: slideId,
    };
    addLike(likeObj).then(setLikeToggle(!likeToggle));
  };
  const handleDeleteLike = (e) => {
    e.preventDefault();
    deleteLike(userLike.id).then(setUserLike(undefined));
    setLikeToggle(!likeToggle);
  };

  const addSlideTag = (e) => {
    e.preventDefault();
  };

  const toggleSlideTagModal = () => {
    setSlideTagModalToggle(!slideTagModalToggle);
  };

  const likeButton = () => {
    if (userLike === undefined) {
      return <Button onClick={handleAddLike}>Like</Button>;
    } else {
      return <Button onClick={handleDeleteLike}>UnLike</Button>;
    }
  };

  const likeCounter = () => {
    return likes?.length;
  };

  useEffect(() => {
    getSlideById(slideId).then(setSlide);
    getNotesBySlideId(slideId).then(setNotes);
    getSlideLikes(slideId).then(setLikes);
    getAllSlideTagsBySlideId(slideId).then(setSlideTags);
    console.log(userLike);
    getSlideLikeByUser(slideId, firebaseId).then(setUserLike);
    getUserByFirebaseId(firebaseId).then(setCurrentUserObj);

  }, [location, slideTagModalToggle]);

  useEffect(()=>{
    slideTagModalDisplay();
  },[slideTagModalToggle])

  useEffect(() => {
    getNotesBySlideId(slideId).then(setNotes);
  }, [update]);

  useEffect(() => {
    getSlideLikes(slideId).then(setLikes);
    getSlideLikeByUser(slideId, firebaseId).then(setUserLike);
    console.log(userLike);
    likeButton();
  }, [likeToggle]);

  const handleScopeClick = () => {
    history.push(`/microscope/${slide.microscope.id}`);
  };

  const slideTagModalDisplay = () => {
    if (currrentUserObj.id === slide.microscope.user.id) {
      setSlideTagModal(
        <SlideTagModal
          key={slide.id}
          slideTagModalToggle={slideTagModalToggle}
          toggleSlideTagModal={toggleSlideTagModal}
          slide={slide}
          slideId={slideId}
          addSlideTag={addSlideTag}
        />
      );
    } else {
      setSlideTagModal(<></>);
    }
  };

  return (
    <>
      {console.log(currrentUserObj)}
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
          <div className="sub-image-info">
            <div>
              {" "}
              {slide.microscope.make} {slide.microscope.model}
            </div>
            <div>{slide.microscope.user.fullName} </div>
          </div>
          <div className="slideTagList">
            {slideTags.map((slideTag) => {
              return <SlideTagCard key={slideTag.id} slideTag={slideTag} />;
            })}
          </div>
          <div className="comments-header">
            <Button className="slide-btn" onClick={handleEdit}>
              Edit Slide
            </Button>
            <Button className="slide-btn" onClick={handleDelete}>
              Delete Slide
            </Button>
            {slideTagModal}
            {/* {currrentUserObj.id === slide.microscope.user.id ? <SlideTagModal key={slide.id} slide={slide} slideId={slideId} addSlideTag={addSlideTag}/> : <></>} */}
            <SlideCommentModal
              key={slide.id}
              slide={slide}
              updateList={updateList}
            />
          </div>
          <section className="slide-detail-info-container">
            <h5></h5>
            {likeButton()}

            {console.log("userLike", userLike)}
            <h5>Likes: {likeCounter()}</h5>
            <h5>Magnifiaction: {slide.magnification}</h5>
            <h5>Description: {slide.description}</h5>
            <h5>Uploaded: {date}</h5>
          </section>
          <h3 className="slide-comments"> Comments</h3>
          <div>
            {notes?.length !== 0 ? (
              notes?.map((note) => {
                return <NoteCard key={note.id} note={note} />;
              })
            ) : (
              <div>No Comments</div>
            )}
            {console.log(slideTags)}
          </div>
        </section>
        <section className="right-container">
          <div>
            <SlideList />
          </div>
          <img
            onClick={handleScopeClick}
            className="slide-detail-scope-img"
            src={slide.microscope.imageUrl}
            alt={slide.microscope.Make}
          />
        </section>
      </div>
    </>
  );
};
