import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { useHistory } from "react-router";

// import "../Slides/Slide.css";

export const LargeScopeImage = ({ slide, location }) => {
  //   const [currentSlide, setCurrentSlide] = useState({});
  //   const [imagePublicIdWithFileExt, setImagePublicIdWithFlieExt ] = useState("")
  const [imagePublicId, setImagePublicId] = useState("");
  const history = useHistory();

  const handleScopeClick = () => {
    history.push(`/microscope/${slide.microscope.id}`);
  };

  useEffect(() => {
    // setCurrentSlide(slide);
    // setTimeout(500)
    if (slide.name !== "") {
      const [, pid] = slide.microscope.imageUrl?.split("DopeScope/");
      const [iPid] = pid?.split(".");
      setImagePublicId(iPid);
    }
  }, [location, slide.name]);

  //   const [, imagePublicIdWithFileExt] =
  //     slide.imageUrl?.split("DopeScope/");
  //   const [imagePublicId,] = imagePublicIdWithFileExt.split(".");

  return (
    <>
      {/* {console.log(imagePublicId , slide)} */}
      <div>
        <CloudinaryContext cloudName="ddaeunjfu" secure="true">
          <Image
            publicId={`DopeScope/${imagePublicId}`}
            secure="true"
            onClick={handleScopeClick}
          >
            <Transformation
              width="375"
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
