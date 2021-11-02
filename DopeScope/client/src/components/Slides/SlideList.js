import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides, getSlideByUserId } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import "./Slide.css";
import firebase from "firebase";
import { MiniSlideCard } from "./MiniSlideCard";
import { SlideSearch } from "./SlideSearch";
import { MiniSlideCardList } from "./MiniSlideCardList";

export const SlideList = () => {
  const history = useHistory();
  const location = history.location.pathname;
  const [allSlides, setAllSlides] = useState([])
  const [slides, setSlides] = useState([]);
  const [currentLocation, setCurrentLocation] = useState("");
  const user = firebase.auth().currentUser;
  const firebaseId = user.uid;
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (location === "/slide" || location.includes("/slide/")) {
      getAllSlides().then(setSlides).then(setCurrentLocation(location));
    } else if (history.location.pathname === "/myslides" || "/") {
      getSlideByUserId(firebaseId)
        .then(setSlides)
        .then(setCurrentLocation(location));
    }
  }, [update, currentLocation]);

  useEffect(()=>{
    getAllSlides().then(setAllSlides)
  },[])

  const updateList = () => {
    setUpdate(!update);
  };

  const slideViewFlexWrap = "scope-slide-container-flex";

  const slideViewColumn = "scope-slide-contaier-column";

  const longLine = (
    <h5 className="scope-slide-title line">
      ________________________________________________________________________________________
    </h5>
  );
  const shortLine = (
    <h5 className="scope-slide-title line">
      ____________________________________
    </h5>
  );

  const slideView =
    location === "/slide" || location === "/myslides" || location === "/"
      ? slideViewFlexWrap
      : slideViewColumn;
  const slideLine =
    location === "/slide" || location === "/myslides" || location === "/"
      ? longLine
      : shortLine;

  return (
    <>
      <div className="slide-container">
        <div className="scope-slides-wrapper">
          <div className="slides-list-header">
            <h5 className="scope-slide-title"> Slides</h5>
            {slideLine}
            {location === "/slide" ? (
              <SlideSearch setSlides={setSlides} />
            ) : (
              <> </>
            )}
          </div>
          <div className={slideView}>
            {slides.length === 0 ? (
              <div>Currenlty No Slides </div>
            ) : location.includes("/slide/") ? (
              slides?.slice(0, 5).map((slide) => {
                return (
                  <MiniSlideCard
                    key={slide.id}
                    slide={slide}
                    updateList={updateList}
                  />
                );
              })
            ) : (
              slides?.map((slide) => {
                return <SlideCard key={slide.id} slide={slide} />;
              })
            )}
          </div>
        </div>
        {/* <div className="mini-slide-list-container">
            <h3>Latest Slides</h3>
            {allSlides?.slice(0,5).map(slide=>{
                return <MiniSlideCard key={slide.id} slide={slide} />
            })}
            </div> */}
      </div>
    </>
  );
};
