import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides, getSlideByUserId } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import "./Slide.css"
import firebase from "firebase";
import { MiniSlideCard } from "./MiniSlideCard";

export const SlideList = () => {
 
  const history = useHistory();
  const location = history.location.pathname
  const [slides, setSlides] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('')
  const user = firebase.auth().currentUser
  const firebaseId = user.uid
  const [update, setUpdate] = useState(true);

  useEffect(() => {
   
    if(location === "/slide" || location.includes('/slide/') ){
    getAllSlides().then(setSlides).then(setCurrentLocation(location))}
    else if (history.location.pathname === "/myslides" || "/"){
      (getSlideByUserId(firebaseId)).then(setSlides).then(setCurrentLocation(location))
    }
  }, [update, currentLocation]);

  const updateList = () => {
    setUpdate(!update)
  }

  const slideViewFlexWrap = "scope-slide-container-flex"

  const slideViewColumn = "scope-slide-contaier-column"

  const longLine = <h5 className="scope-slide-title line">________________________________________________________________________________________</h5>
  const shortLine = <h5 className="scope-slide-title line">____________________________________</h5>
  

  const slideView = ( location === "/slide" || location ==="/myslides" || location ==="/" ? slideViewFlexWrap : slideViewColumn)
  const slideLine = ( location === "/slide" || location ==="/myslides" || location==="/" ? longLine : shortLine)

  return (
    <>
    <div className="slide-container">
      {/* <h1 className="slide-list-title">Slides</h1> */}
      <div className="scope-slides-wrapper">
                <h5 className="scope-slide-title">{location.includes("/slide")  ? "Latest Slides" : "Slides"}</h5>
                {slideLine}
                {/* <h5 className="scope-slide-title line">________________________________________________________________________________________</h5> */}
               <div className={slideView}>
            { slides.length === 0 ? <div>Currenlty No Slides </div> : location.includes("/slide/") ? slides?.slice(0,5).map(slide => {
                return  <MiniSlideCard key={slide.id} slide={slide} updateList={updateList}/>}) :  slides?.map(slide => { return <SlideCard key={slide.id} slide={slide} />
            })}
            </div>
            </div>
      </div>
    </>
  );
};
