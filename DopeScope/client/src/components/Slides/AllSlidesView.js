import React from "react";
import { MiniSlideCardList } from "./MiniSlideCardList";
import { SlideList } from "./SlideList";
import { Image, Transformation } from "cloudinary-react";

export const AllSlidesView = () => {
  return (
    <>
      <div className="all-slides-view-wrapper">
          <div className="all-slide-view-left">
        <SlideList />
        </div>
        <div className="all-slides-view-right">
        <Image className="dope-scope-logo-mini" cloudName="ddaeunjfu" publicId="sldw7e2sdswxiiwnqxng.png" secure="true">
              <Transformation width="275" height="170" crop="fill"/>
              </Image>
          <MiniSlideCardList />
        </div>
      </div>
    </>
  );
};
