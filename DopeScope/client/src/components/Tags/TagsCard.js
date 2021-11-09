import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { addSlideTag, deleteSlideTag } from "../../modules/SlideTagManager";

import "./Tags.css";

export const TagCard = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [tagFound, setTagFound] = useState({});

  useEffect(() => {
    setIsActive(props.isActive);
    setTagFound(props.foundTag);
  }, [tagFound]);

  const handleInactiveTagClick = () => {
    const newSlideTagObj = {
      tagId: props.tag.id,
      slideId: parseInt(props.slideId),
    };
    addSlideTag(newSlideTagObj);
    setIsActive(!isActive);
  };
  const handleActiveTagClick = () => {
    deleteSlideTag(tagFound.id);
    setIsActive(!isActive);
  };

  return (
    <>
      {isActive ? (
        <div
          className={`tag-active-${isActive}`}
          onClick={handleActiveTagClick}
        >
          {props.tag.tagName}
        </div>
      ) : (
        <div
          className={`tag-active-${isActive}`}
          onClick={handleInactiveTagClick}
        >
          {props.tag.tagName}
        </div>
      )}
    </>
  );
};
