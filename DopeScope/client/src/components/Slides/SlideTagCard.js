import React from "react";

export const SlideTagCard = (props) => {
  return (
    <>
      <div className="slide-tag-card">{props.slideTag.tag.tagName}</div>
    </>
  );
};
