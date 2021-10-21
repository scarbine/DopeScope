import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { getAllSlides } from "../../modules/SlideManager";
import { SlideCard } from "./SlideCard";
import { slides } from "../../modules/SlideManager";
import "./Slide.css"

export const SlideList = () => {
 
  const history = useHistory();
  const [slides, setSlides] = useState([]);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    getAllSlides().then(setSlides)
  }, [update]);

  const handleAddSlide =() => {
      history.push("/slide/form")
  }

  const updateList = () => {
    setUpdate(!update)
  }



  return (
    <>
      <h1>Slides</h1>
      <Button className="slide-btn" onClick={handleAddSlide}>Add Slide</Button>
      <div>
          {console.log(slides)}
      {slides?.map((slide) => { 
        return <SlideCard key={slide.id} slide={slide}  updateList={updateList}/>;
      })}
      </div>
    </>
  );
};
