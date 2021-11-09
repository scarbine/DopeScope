import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import {
  Image,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

import "./Slide.css";

export const SlideDetailImage = ({ slide, location,height,width }) => {
  const [imagePublicId, setImagePublicId] = useState("");

  useEffect(() => {

    if (slide.name !== "") {
      const [, pid] = slide.imageUrl.split("DopeScope/");
      const [iPid] = pid.split(".");
      setImagePublicId(iPid);
    }
  }, [location, slide.name]);


  return (
    <>
 
      <div className="slide-card-container">
        <CloudinaryContext cloudName="ddaeunjfu" secure="true">
          <Image
            className="slide-detail-image"
            publicId={`DopeScope/${imagePublicId}`}
            secure="true"
          >
            <Transformation width={width} height={height} crop="thumb" />
          </Image>
        </CloudinaryContext>
      </div>
    </>
  );
};
