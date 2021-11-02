import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getAllSlides } from "../../modules/SlideManager";
import { MiniSlideCard } from "./MiniSlideCard";


export const MiniSlideCardList = () => {
  
  const [slides, setSlides] = useState([]);
  

  useEffect(() => {
    getAllSlides().then(setSlides)
}, []);




  return (
    <>
      <div className="mini-slide-list-container">
        {/* <img className="latest-slide-image" src={slide?.imageUrl} alt={slide?.name} /> */}
        <h3>Latest Slides</h3>
        {slides?.slice(0, 5).map((slide) => {
          return <MiniSlideCard key={slide.id} slide={slide} />;
        })}
      </div>
    </>
  );
};
