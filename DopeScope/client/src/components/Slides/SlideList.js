import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import "./Slide.css"

export const SlideList = () => {
 

  const [slides, setSlides] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    getAllSlides().then(setSlides)
  }, [update]);

  const updateList = () => {
    setUpdate(!update)
  }



  return (
    <>
    <div className="slide-container">
      {/* <h1 className="slide-list-title">Slides</h1> */}
      <div>
          {console.log(slides)}
      {slides?.map((slide) => { 
        return <SlideCard key={slide.id} slide={slide}  updateList={updateList}/>;
      })}
      </div>
      </div>
    </>
  );
};
