import React from "react";
import { useHistory } from "react-router";
import { Card, CardBody, CardTitle } from "reactstrap";

import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

import "./Microscope.css";
import "../Slides/Slide.css";

export const MicroscopeCard = (props) => {
  const history = useHistory();
  const [, imagePublicIdWithFileExt] =
    props.microscope.imageUrl.split("DopeScope/");
  const [imagePublicId] = imagePublicIdWithFileExt.split(".");

  const handleOnClick = () => {
    history.push(`/microscope/${props.microscope.id}`);
  };

  return (
    <>
      <div className="slide-card-container">
        <Card className="slide-card" onClick={handleOnClick}>
          <CloudinaryContext cloudName="ddaeunjfu" secure="true">
            <Image publicId={`DopeScope/${imagePublicId}`} secure="true">
              <Transformation width="237" height="237" crop="thumb" />
            </Image>
          </CloudinaryContext>

          <CardBody>
            <div className="card-subtitle">
              <CardTitle tag="h5">
                {props.microscope.make} {props.microscope.model}
              </CardTitle>
            </div>
            <div className="slide-buttons"></div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
