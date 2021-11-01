import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { NoteCard } from "../Notes/NotesCard";
import { deleteSlide } from "../../modules/SlideManager";
import { Button, Card } from "reactstrap";
import { SlideCommentModal } from "./SlideCommentModal";
import { SlideList } from "./SlideList";
import { addLike, deleteLike, getSlideLikes } from "../../modules/Likemanager";
import firebase from "firebase";
import { getSlideLikeByUser } from "../../modules/Likemanager";
import { getAllSlideTagsBySlideId } from "../../modules/SlideTagManager";
import { SlideTagCard } from "./SlideTagCard";
import { SlideTagModal } from "./SlideTagModal";
import { getUserByFirebaseId } from "../../modules/UserManager";
import { MiniSlideCardList } from "./MiniSlideCardList";
import { CustomImageSearch } from "../CustomImageSearch/CustomImageSearch";
import { SlideDetailImage } from "./SlideDetailImage";
import { LargeScopeImage } from "../Microscopes/LargeScopeImage";

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
  const [useEffectTrigger, setEseEffectTrigger] = useState(false);
  const [slideTagModalToggle, setSlideTagModalToggle] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
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
  // const [, imagePublicIdWithFileExt] = slide.imageUrl.split("DopeScope/");
  // const [imagePublicId] = imagePublicIdWithFileExt.split(".");
  
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
      return (
        <>
          {/* <Button onClick={handleAddLike}>Like</Button> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
            onClick={handleAddLike}
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </svg>
        </>
      );
    } else {
      return (
        <>
          {/* <Button onClick={handleDeleteLike}>UnLike</Button> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill"
            viewBox="0 0 16 16"
            onClick={handleDeleteLike}
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </>
      );
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
    setEseEffectTrigger(!useEffectTrigger);
    getNotesBySlideId(slideId).then(setNotes);
  }, [location, slideTagModalToggle]);

  useEffect(()=>{
  },[])

  useEffect(() => {
    setTimeout(1000);
    slideTagModalDisplay();
    mapSearchResults();
  }, [useEffectTrigger, location, slideTagModalToggle, slideId]);

  useEffect(() => {
    getNotesBySlideId(slideId).then(setNotes);
  }, [update]);

  useEffect(() => {
    getSlideLikes(slideId).then(setLikes);
 ;
  }, [likeToggle]);

  useEffect(()=>{
    getSlideLikeByUser(slideId, firebaseId).then(setUserLike);
    likeButton()
  },[likeToggle])



  const handleScopeClick = () => {
    history.push(`/microscope/${slide.microscope.id}`);
  };

  const slideTagModalDisplay = () => {
    // if (currrentUserObj.id === slide.microscope.user.id) {
    //   setSlideTagModal(
    //     <SlideTagModal
    //       key={Math.random}
    //       slideTagModalToggle={slideTagModalToggle}
    //       toggleSlideTagModal={toggleSlideTagModal}
    //       slide={slide}
    //       slideId={slideId}
    //       addSlideTag={addSlideTag}
    //     />
    //   );
    // } else {
    //   setSlideTagModal(<></>);
    // }
    setSlideTagModal(
      <SlideTagModal
        key={Math.random}
        slideTagModalToggle={slideTagModalToggle}
        toggleSlideTagModal={toggleSlideTagModal}
        slide={slide}
        slideId={slideId}
        addSlideTag={addSlideTag}
      />
    );
  };

  const mapSearchResults = () => {
    return searchResults !== undefined ? (
      searchResults.items?.map((sr) => {
        return (
          <>
            <div className="search-return-container">
              <a className="search-return-card" href={sr.image.contextLink}>
                <img className="search-results-image" src={sr.image.thumbnailLink} alt={sr.title} />
                {/* <div className="search-result-title">{sr.title}</div> */}
                <div className="search-result-title">{sr.snippet}</div>
              </a>
            </div>
          </>
        );
      })
    ) : (
      <> </>
    );
  };

  return (
    <>
      <div className="slide-detail-container">
        <section className="slide-details-column">
          <h1 className="slide-detail-header">{slide.name}</h1>
          <div className="image-container">
            {/* <img
              className="slide-detail-img"
              src={slide.imageUrl}
              alt={slide.name}
            /> */}
            <SlideDetailImage slide={slide} location={location}/>
            <div className="sub-image-info">
              <div>
                {slide.microscope.make} {slide.microscope.model}
              </div>
              <div className="sub-image-full-name">{slide.microscope.user.fullName} </div>
              <div className="likes-container">
                <div className="likes-item">{likeButton()}</div>
                <div className="likes-item">{likeCounter()}</div>
              </div>
            </div>
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
            <SlideCommentModal
              key={slide.id}
              slide={slide}
              updateList={updateList}
              setUpdate={setUpdate}
              update={update}
              setNotes={setNotes}
              slideId={slideId}
              getNotesBySlideId={getNotesBySlideId}
            />
            <CustomImageSearch
              slide={slide}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
            />
          </div>
          {mapSearchResults()}
          <section className="slide-detail-info-container">
            <h5></h5>

            <h5>Magnifiaction: x{slide.magnification}</h5>
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
          </div>
        </section>
        <section className="right-container">
          <div>
            <MiniSlideCardList likes={likes}/>
          </div>
          <div className="large-scope-img">
          <LargeScopeImage slide={slide} location={location} />
          </div>
        </section>
      </div>
    </>
  );
};
