import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { addSlideTag, deleteSlideTag } from "../../modules/SlideTagManager";

import "./Tags.css";

export const TagCardSearch = ({ tag,  setSearchTagId, setSearchTagName }) => {

  
    const handleTagClick = (e) => {
    e.preventDefault()
    setSearchTagId(tag.id)
    setSearchTagName(tag.tagName)
    console.log(tag.id, tag.tagName)
  };



  return (
    <>
      <div className='search-tag-container'>
        <div onClick={handleTagClick}>{tag.tagName}</div>
      </div>
    </>
  );
};
