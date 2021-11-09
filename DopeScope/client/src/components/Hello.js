import firebase from "firebase";
import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getUserByFirebaseId } from "../modules/UserManager";
import { MicroscopeList } from "./Microscopes/MicroscopeList";
import { SlideList } from "./Slides/SlideList";
import "../index.css";
import { MiniSlideCardList } from "./Slides/MiniSlideCardList";
import { Image, Transformation } from "cloudinary-react";
import { SlideSearch } from "./Slides/SlideSearch";
import { getAllSlides, getAllSlidesCount } from "../modules/SlideManager";

export const Home = () => {
  const user = firebase.auth().currentUser;
  const firebaseId = user.uid;
  const [viewToggle, setViewToggle] = useState(false);
  const [view, setView] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [slides, setSlides] = useState([]);
  const [slideCount, setSlideCount] = useState(0);

  const DisplayView = () => {
    if (view === 0) {
      return <SlideList />;
    } else if (view === 1) {
      return <MicroscopeList />;
    }
  };

  const handleMyScopesClick = () => {
    setView(1);
    console.log(view);
  };
  const handleMySlidesClick = () => {
    setView(0);
    console.log(view);
  };
  useEffect(() => {
    // getAllSlides().then(setSlides);
    getAllSlidesCount().then(setSlideCount);
  }, []);

  useEffect(() => {
    DisplayView();
    getUserByFirebaseId(firebaseId).then(setCurrentUser);
  }, [view]);

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-container-left">
          <div className="dashboard-logo">
            <Image
              className="dope-scope-logo-dashboard-main"
              cloudName="ddaeunjfu"
              publicId="sldw7e2sdswxiiwnqxng.png"
              secure="true"
            >
              <Transformation width="275" height="170" crop="fill" />
            </Image>
            <h3 className="dashboard-header">
              {" "}
              Welcome to DopeScope,<br></br> {currentUser.fullName}!
            </h3>
            <div className="dashboard-veiw-toggle-buttons">
              <h5 className="view-toggle-buttons" onClick={handleMySlidesClick}>
                My Slides
              </h5>{" "}
              <h5 className="view-toggle-buttons" onClick={handleMyScopesClick}>
                My Scopes
              </h5>
            </div>
          </div>

          {/* <div className="scope-slides-wrapper">
            <SlideList />
        </div>
        <div className="scope-list-dashboard">
          <MicroscopeList />
        </div> */}
          <div className="display-view-box">
            <div className="display-view-wrapper">{DisplayView()}</div>
          </div>
        </div>
        <div className="mini-slide-list-dashboard">
          {/* <Image
          className="dope-scope-logo-mini"
          cloudName="ddaeunjfu"
          publicId="sldw7e2sdswxiiwnqxng.png"
          secure="true"
        >
          <Transformation width="275" height="170" crop="fill" />
        </Image> */}

          <div className="slide-counter">
            <div className="slide-counter-total">{slideCount}</div>
            <div className="slide-counter-text">DopeScopes</div>
          </div>
          <MiniSlideCardList sliceNumber={6} />
        </div>
      </div>
    </>
  );
};
