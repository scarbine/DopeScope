import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { deleteSlide } from "../../modules/SlideManager";
import { Button } from "reactstrap";
import { SlideCommentModal } from "./SlideCommentModal";
import firebase from "firebase";
import { getAllSlideTagsBySlideId } from "../../modules/SlideTagManager";
import { SlideTagCard } from "./SlideTagCard";
import { SlideTagModal } from "./SlideTagModal";
import { getUserByFirebaseId } from "../../modules/UserManager";
import { MiniSlideCardList } from "./MiniSlideCardList";
import { CustomImageSearch } from "../CustomImageSearch/CustomImageSearch";
import { SlideDetailImage } from "./SlideDetailImage";
import { LargeScopeImage } from "../Microscopes/LargeScopeImage";
import { Image, Transformation } from "cloudinary-react";
import { LikesButton } from "../Likes/LikesButton";
import { NotesList } from "../Notes/NotesList";

export const SlideDetails = () => {
  const { slideId } = useParams();
  const history = useHistory();
  const location = history.location.pathname;
  const [update, setUpdate] = useState(false);
  const [likes, setLikes] = useState([]);
  const user = firebase.auth().currentUser;
  const firebaseId = user.uid;
  const [userLike, setUserLike] = useState(undefined);
  const [slideTags, setSlideTags] = useState([]);
  const [currrentUserObj, setCurrentUserObj] = useState({});
  const [slideTagModal, setSlideTagModal] = useState(null);
  const [useEffectTrigger, setEseEffectTrigger] = useState(false);
  const [slideTagModalToggle, setSlideTagModalToggle] = useState(false);
  const [searchResults, setSearchResults] = useState(undefined);
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

  const addSlideTag = (e) => {
    e.preventDefault();
  };

  const toggleSlideTagModal = () => {
    setSlideTagModalToggle(!slideTagModalToggle);
  };

  useEffect(() => {
    getSlideById(slideId).then(setSlide);
    getNotesBySlideId(slideId).then(setNotes);
    getAllSlideTagsBySlideId(slideId).then(setSlideTags);
    console.log(userLike);
    getUserByFirebaseId(firebaseId).then(setCurrentUserObj);
    setEseEffectTrigger(!useEffectTrigger);
    getNotesBySlideId(slideId).then(setNotes);
  }, [location, slideTagModalToggle]);

  useEffect(() => {}, []);

  useEffect(() => {
    slideTagModalDisplay();
  }, [useEffectTrigger, location, slideTagModalToggle, slideId]);

  useEffect(() => {
    getNotesBySlideId(slideId).then(setNotes);
  }, [update]);

  const slideTagModalDisplay = () => {
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

  return (
    <>
      <div className="slide-detail-container">
        <section className="slide-details-column">
          <h1 className="slide-detail-header">{slide.name}</h1>
          <div className="image-container">
            <SlideDetailImage
              slide={slide}
              location={location}
              height={550}
              width={550}
            />
            <div className="sub-image-info">
              <div>
                {slide.microscope.make} {slide.microscope.model}
              </div>
              <div className="sub-image-full-name">
                {slide.microscope.user.fullName}{" "}
              </div>
              <div> x{slide.magnification}</div>
              <div className="likes-container">
                <LikesButton slideId={slideId} />
              </div>
            </div>
          </div>
          <div className="slideTagList">
            {slideTags.map((slideTag) => {
              return <SlideTagCard key={slideTag.id} slideTag={slideTag} />;
            })}
          </div>
          <div className="comments-header">
            {currrentUserObj.id === slide.microscope.userId ? (
              <>
                {" "}
                <Button className="slide-btn" onClick={handleEdit}>
                  Edit Slide
                </Button>
                <Button className="slide-btn" onClick={handleDelete}>
                  Delete Slide
                </Button>
                {slideTagModal}
              </>
            ) : (
              <> </>
            )}
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
          {searchResults !== undefined ? (
            searchResults.items?.map((sr) => {
              return (
                <>
                  <div className="search-return-container">
                    <a
                      className="search-return-card"
                      href={sr.image.contextLink}
                    >
                      <img
                        className="search-results-image"
                        src={sr.image.thumbnailLink}
                        alt={sr.title}
                      />
                      <div className="search-result-title">{sr.snippet}</div>
                    </a>
                  </div>
                </>
              );
            })
          ) : (
            <> </>
          )}
         
          <h3 className="slide-comments"> Comments</h3>
          <div className="note-card-div">
            <div className="note-card-wrapper">
              <NotesList notes={notes}/>
            </div>
          </div>
        </section>
        <section className="right-container">
          <div>
            <Image
              className="dope-scope-logo-mini"
              cloudName="ddaeunjfu"
              publicId="sldw7e2sdswxiiwnqxng.png"
              secure="true"
            >
              <Transformation width="275" height="170" crop="fill" />
            </Image>
            <MiniSlideCardList likes={likes} sliceNumber={3} />
          </div>
          <div className="large-scope-img">
            <LargeScopeImage slide={slide} location={location} />
          </div>
        </section>
      </div>
    </>
  );
};
