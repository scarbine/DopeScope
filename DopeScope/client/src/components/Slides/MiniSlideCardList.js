import React from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { getAllSlides } from "../../modules/SlideManager";
import { MiniSlideCard } from "./MiniSlideCard";


export const MiniSlideCardList = () => {
  
  const history = useHistory()
  const [slides, setSlides] = useState([]);
  const location = history.location.pathname;
  

  useEffect(() => {
    getAllSlides().then(setSlides)
}, []);

    const sliceNumber = location === "/" || "/slide" ? 5 : 3 


  return (
    <>
      <div className="mini-slide-list-container">
        {/* <img className="latest-slide-image" src={slide?.imageUrl} alt={slide?.name} /> */}
        <h3>Latest Slides</h3>
        {slides?.slice(0, sliceNumber).map((slide) => {
          return <MiniSlideCard key={slide.id} slide={slide} />;
        })}
      </div>
    </>
  );
};
