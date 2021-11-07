import React from "react";

import { getSearchResults } from "../../modules/CustomerSearchmanager";
import { CustomerSearchResultsModal } from "./CustomImageSearchResultsModal";



export const CustomImageSearch = (props) => {

    
   
  
    const num = 5
    const q = props.slide.name
    const searchType = 'image'
  


    const handleOnClick = () => {
            getSearchResults(num,q,searchType).then(props.setSearchResults)
        //   console.log(props.searchResults.items)
      
        
    }

    return (
        <>
            <div onClick={handleOnClick} className="slide-btn btn btn-secondary">
                Learn More
            </div>
            {/* <CustomerSearchResultsModal name="Learn More" searchResults={props.searchResults} /> */}
     
        </>
    )
}