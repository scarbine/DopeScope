import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getAllTags } from "../../modules/TagManager";
import { SlideCard } from "../Slides/SlideCard";
import { searchSlidesByTagId } from "../../modules/SlideTagManager";
import { TagCardSearch } from "./TagCardSearch";
import { getAllSlides } from "../../modules/SlideManager";
import { MiniSlideCardList } from "../Slides/MiniSlideCardList";
import { Image, Transformation } from "cloudinary-react";

export const TagSearch = () => {
  const [foundSlides, setFoundSlides] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchTagId, setSearchTagId] = useState(0);
  const [slideTagList, setSlideTagList] = useState([]);
  const [searchTagName, setSearchTagName] = useState("");

  useEffect(() => {
    getAllTags().then(setAllTags);
  }, []);

  useEffect(() => {
    getAllSlides().then(setFoundSlides);
  }, []);

  useEffect(() => {
    if (searchTagId !== 0) {
      searchSlidesByTagId(searchTagId).then(setSlideTagList);
    }
  }, [searchTagId]);

  useEffect(() => {
    let foundArray = [];
    for (let i = 0; i < slideTagList.length; i++) {
      foundArray.push(slideTagList[i].slide);
    }
    setFoundSlides(foundArray);
    console.log("foundArray", foundArray);
  }, [slideTagList]);

  return (
    <>
      <div className="tag-slide-page">
        <div>
          <div>
            <h3 className="found-slides-header-tags">Search By Tag</h3>
            <div className="all-tags-container">
              {allTags.map((tag) => {
                return (
                  <TagCardSearch
                    className="search-tag-card"
                    key={tag.id}
                    tag={tag}
                    setSearchTagId={setSearchTagId}
                    setSearchTagName={setSearchTagName}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h5 className="found-slides-header">
              {foundSlides.length} {searchTagName}{" "}
              {foundSlides.length === 1 ? "Slide" : "Slides"}{" "}
            </h5>
            {console.log(foundSlides)}
            <div className="found-slides-cotainer">
              {foundSlides?.map((slide) => {
                return <SlideCard key={slide.id} slide={slide} />;
              })}
            </div>
          </div>
        </div>
        <div>
          <Image
            className="dope-scope-logo-mini"
            cloudName="ddaeunjfu"
            publicId="sldw7e2sdswxiiwnqxng.png"
            secure="true"
          >
            <Transformation width="275" height="170" crop="fill" />
          </Image>
          <MiniSlideCardList sliceNumber={7} />
        </div>
      </div>
    </>
  );
};
