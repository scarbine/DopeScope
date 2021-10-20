import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { getAllSlides } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";

export const SlideList = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    getAllSlides().then(setSlides);
  }, []);

  return (
    <>
      <h1>Slides</h1>
      <Button>Add Slide</Button>
      <div>
          {console.log(slides)}
      {slides?.map((slide) => { 
        return <SlideCard key={slide.id} slide={slide} />;
      })}
      </div>
    </>
  );
};
