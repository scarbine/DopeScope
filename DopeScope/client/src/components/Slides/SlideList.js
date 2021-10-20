import React, { useEffect, useState } from "react";
import { getAllSlides } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";

export const SlideList = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getAllSlides().then(setSlides);
  }, []);

  return (
    <>
      <h1>Slide List</h1>
      <div>
      {slides.map((slide) => {
        <SlideCard key={slide.id} slide={slide} />;
      })}
      </div>
    </>
  );
};
