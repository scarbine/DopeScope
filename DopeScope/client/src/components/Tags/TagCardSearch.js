import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { addSlideTag, deleteSlideTag } from "../../modules/SlideTagManager";

import "./Tags.css";

export const TagCardSearch = ({ tag,  setSearchTagId }) => {
  
    const handleTagClick = (e) => {
    e.preventDefault()
    setSearchTagId(tag.id)
    console.log(tag.id)
  };

  return (
    <>
      <div className="search-tag-container">
        <div onClick={handleTagClick}>{tag.tagName}</div>
      </div>
    </>
  );
};
