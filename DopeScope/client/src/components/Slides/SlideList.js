import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides, getSlideByUserId } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import "./Slide.css"
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { getUserByFirebaseId } from "../../modules/UserManager";
import firebase from "firebase";

export const SlideList = () => {
 
  const history = useHistory();
  const location = history.location.pathname
  const [slides, setSlides] = useState([]);
  const user = firebase.auth().currentUser
  const firebaseId = user.uid
  const [update, setUpdate] = useState(true);

  useEffect(() => {
   
    if(location === "/slide" ){
    getAllSlides().then(setSlides)}
    else if (history.location.pathname === "/myslides" || "/"){
      (getSlideByUserId(firebaseId)).then(setSlides)
    }
  }, [update, location]);

  const updateList = () => {
    setUpdate(!update)
  }



  return (
    <>
    <div className="slide-container">
      {/* <h1 className="slide-list-title">Slides</h1> */}
      <div className="scope-slides-wrapper">
                <h5 className="scope-slide-title">{location === "/slide" ? "All Slides" : "Slides"}</h5>
                <h5 className="scope-slide-title line">________________________________________________________________________________________</h5>
            <div className="scope-slides">
            { slides.length === 0 ? <div>Currenlty No Slides </div> : slides?.map(slide => {
                return <SlideCard key={slide.id} slide={slide} />
            })}
            </div>
            </div>
      </div>
    </>
  );
};
