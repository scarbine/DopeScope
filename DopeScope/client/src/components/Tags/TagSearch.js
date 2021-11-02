import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getAllTags } from "../../modules/TagManager";
import { SlideCard } from "../Slides/SlideCard";
import { searchSlidesByTagId } from "../../modules/SlideTagManager";
import { TagCardSearch } from "./TagCardSearch";
import { getAllSlides } from "../../modules/SlideManager";

export const TagSearch = () => {
  const [foundSlides, setFoundSlides] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchTagId, setSearchTagId] = useState(0);
  const [slideTagList, setSlideTagList] = useState([]);

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  useEffect(()=>{
      getAllSlides().then(setFoundSlides)
  },[])

  useEffect(() => {
    if (searchTagId !== 0) {
      searchSlidesByTagId(searchTagId).then(setSlideTagList);
    }
  }, [searchTagId]);

  useEffect(()=> {

    let foundArray = []
      for (let i = 0 ; i < slideTagList.length ; i++){
        foundArray.push(slideTagList[i].slide)
      }
      setFoundSlides(foundArray)
      console.log("foundArray" ,foundArray)
      
  },[slideTagList])

  

//   for (let i = 0 ; i < foundSlides.length ; i++){
      
//         foundSlides[i].slide.map

        
//   }
  return (
    <>
      <div>
        <h5>Search By Tag</h5>
        {allTags.map((tag) => {
          return (
            <TagCardSearch
              key={tag.id}
              tag={tag}
              setSearchTagId={setSearchTagId}
            />
          );
        })}
      </div>

      <div>
        <h5>Found Slides List</h5>
        {console.log(foundSlides)}
        {foundSlides?.map((slide) => {
          return <SlideCard key={slide.id} slide={slide} />;
        })}

      </div>
    </>
  );
};
