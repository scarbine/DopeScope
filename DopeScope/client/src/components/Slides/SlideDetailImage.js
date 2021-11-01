import React from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { Card, CardImg, CardBody, CardTitle, Col } from "reactstrap";
import { getSlideLikes } from "../../modules/Likemanager";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

import "./Slide.css";

export const SlideDetailImage = ({ slide, location }) => {
//   const [currentSlide, setCurrentSlide] = useState({});
//   const [imagePublicIdWithFileExt, setImagePublicIdWithFlieExt ] = useState("")
  const [imagePublicId, setImagePublicId] = useState("")

    

  useEffect(() => {
    // setCurrentSlide(slide);
    // setTimeout(500)
    if(slide.name !== ""){
        const [,pid] =  slide.imageUrl.split("DopeScope/");
        const [iPid,] = pid.split(".")
        setImagePublicId(iPid)
    }
  }, [location, slide.name]);

//   const [, imagePublicIdWithFileExt] =
//     slide.imageUrl?.split("DopeScope/");
//   const [imagePublicId,] = imagePublicIdWithFileExt.split(".");

  return (
    <>
    {/* {console.log(imagePublicId , slide)} */}
      <div className="slide-card-container">
        <CloudinaryContext cloudName="ddaeunjfu" secure="true">
          <Image className="slide-detail-image" publicId={`DopeScope/${imagePublicId}`} secure="true">
            <Transformation
              width="550"
              height="550"
              // gravity="face"
              crop="thumb"
            />
          </Image>
        </CloudinaryContext>
      </div>
    </>
  );
};
