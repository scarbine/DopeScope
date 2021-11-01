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

export const SlideCard = ({ slide, updateList }) => {
  const [date] = slide.dateCreated.split("T");
  const history = useHistory();
  const [likes, setLikes] = useState([]);
  const [, imagePublicIdWithFileExt] = slide.imageUrl.split("DopeScope/");
  const [imagePublicId] = imagePublicIdWithFileExt.split(".");

  const handleDetails = () => {
    history.push(`/slide/${slide.id}`);
  };

  useEffect(() => {
    getSlideLikes(slide.id).then(setLikes);
  }, []);

  return (
    <>
      <div className="slide-card-container">
        <Card className="slide-card">
          
          {/* <Image
            top
            className="slide-card-image"
            width="100%"
            src={slide.imageUrl}
            alt="Card image cap"
            onClick={handleDetails}
            thumbnail={true} 
          /> */}
           <CloudinaryContext cloudName="ddaeunjfu" secure="true">
        <Image publicId={`DopeScope/${imagePublicId}`} secure="true">
          <Transformation
            width="237"
            height="237"
            // gravity="face"
            crop="thumb"
          />
        </Image>
      </CloudinaryContext>
          
          <CardBody>
            <div className="card-subtitle">
              <CardTitle tag="h5">{slide.name}</CardTitle>
              <div>
                {likes.length}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </div>
            </div>
            <div className="slide-buttons"></div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
