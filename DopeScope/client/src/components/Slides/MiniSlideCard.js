import React from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { getSlideLikes } from "../../modules/Likemanager";
import {
  Image,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";

export const MiniSlideCard = (props) => {
  const history = useHistory();
  const [likes, setLikes] = useState([]);
  const [, imagePublicIdWithFileExt] = props.slide.imageUrl.split("DopeScope/");
  const [imagePublicId] = imagePublicIdWithFileExt.split(".");

  const handleClick = () => {
    history.push(`/slide/${props.slide.id}`);
  };

  useEffect(() => {
    getSlideLikes(props.slide.id).then(setLikes);
  }, []);

  return (
    <>
      <div className="slide-card-mini" onClick={handleClick}>
        <div className="left-box">
          <div className="left-box-text">{props.slide.name}</div>
        </div>
        <div className="center-box">
      <CloudinaryContext cloudName="ddaeunjfu" secure="true">
        <Image publicId={`DopeScope/${imagePublicId}`} secure="true">
          <Transformation
            width="80"
            height="80"
            // gravity="face"
            crop="thumb"
          />
        </Image>
      </CloudinaryContext>
        </div>
        <div className="right-box">
          <div>{likes.length}</div>
          <div>{props.slide.microscope.user.fullName}</div>
        </div>
      </div>
    </>
  );
};
