import React from "react";
import { MiniSlideCardList } from "../Slides/MiniSlideCardList";
import { MicroscopeList } from "./MicroscopeList";
import { Image, Transformation } from "cloudinary-react";

export const AllScopesView = () => {
  return (
    <>
      <div className="all-scopes-view-wrapper">
        <div>
          <MicroscopeList />
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
          <MiniSlideCardList sliceNumber={6} />
        </div>
      </div>
    </>
  );
};
