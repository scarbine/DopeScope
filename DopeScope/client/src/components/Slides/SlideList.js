import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import "./Slide.css"

export const SlideList = () => {
  const [slides, setSlides] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getAllSlides().then(setSlides);
  }, []);

  const handleAddSlide =() => {
      history.push("/slide/form")
  }

  return (
    <>
      <h1>Slides</h1>
      <Button className="slide-btn" onClick={handleAddSlide}>Add Slide</Button>
      <div>
          {console.log(slides)}
      {slides?.map((slide) => { 
        return <SlideCard key={slide.id} slide={slide} />;
      })}
      </div>
    </>
  );
};
