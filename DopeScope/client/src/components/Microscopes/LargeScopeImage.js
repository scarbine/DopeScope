import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import {
  Image,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { useHistory } from "react-router";



export const LargeScopeImage = ({ slide, location }) => {

  const [imagePublicId, setImagePublicId] = useState("");
  const history = useHistory();

  const handleScopeClick = () => {
    history.push(`/microscope/${slide.microscope.id}`);
  };

  useEffect(() => {

    if (slide.name !== "") {
      const [, pid] = slide.microscope.imageUrl?.split("DopeScope/");
      const [iPid] = pid?.split(".");
      setImagePublicId(iPid);
    }
  }, [location, slide.name]);


  return (
    <>
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
              crop="thumb"
            />
          </Image>
        </CloudinaryContext>
      </div>
    </>
  );
};
