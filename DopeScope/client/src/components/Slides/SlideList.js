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
      <div className="slide-card-wrapper">
      {slides?.map((slide) => { 
        return <SlideCard key={slide.id} slide={slide}  updateList={updateList}/>;
      })}
      </div>
      </div>
    </>
  );
};
