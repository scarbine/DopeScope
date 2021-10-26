import React from "react";
import { searchSlides } from "../../modules/SlideManager";
import "./Slide.css"

export const SlideSearch = ({setSlides}) => {
    return (
        <div className="searchDiv">
            <div className="searchBar">
                </div>
                <input type="text"
                    className="input--wide search-text-area"
                    onKeyUp={(event) => {
                        searchSlides(event.target.value).then((slideResults) => {
                            setSlides(slideResults);
                        });
                    }}
                    placeholder="Search for a Slide..." />
            </div>
        
    )
};
