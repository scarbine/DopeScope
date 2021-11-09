import React from "react";

import { getSearchResults } from "../../modules/CustomerSearchmanager";

export const CustomImageSearch = ({
  slide,
  setSearchResults,
  searchResults,
}) => {
  const num = 5;
  const q = slide.name;
  const searchType = "image";

  const handleOnClick = () => {
    getSearchResults(num, q, searchType).then(setSearchResults);
  };

  const handleColapse = () => {
    setSearchResults(undefined);
    console.log(searchResults);
  };

  return (
    <>
      {searchResults === undefined ? (
        <div onClick={handleOnClick} className="slide-btn btn btn-secondary">
          Learn More
        </div>
      ) : (
        <div onClick={handleColapse} className="slide-btn btn btn-secondary">
          See Less
        </div>
      )}
    </>
  );
};
