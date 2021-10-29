import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getSearchResults } from "../../modules/CustomerSearchmanager";


export const CustomImageSearch = (props) => {

    
   
    const cx = '2d3ec381415dd57e8'
    const num = 5
    const q = props.slide.name
    const searchType = 'image'
    const key = 'AIzaSyANAiKjGhwguIaj_lRn9bwog6KLEZ_timU'


    const handleOnClick = () => {
            getSearchResults(num,q,searchType).then(props.setSearchResults)
          console.log(props.searchResults.items)
    }

    return (
        <>
            <div onClick={handleOnClick} className="slide-btn btn btn-secondary">
                Web Search
            </div>
     
        </>
    )
}