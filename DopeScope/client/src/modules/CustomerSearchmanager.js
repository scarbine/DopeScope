import React from "react";

 
const baseUrl = 'https://www.googleapis.com/customsearch/v1'
const key = 'AIzaSyANAiKjGhwguIaj_lRn9bwog6KLEZ_timU'
const cx = '2d3ec381415dd57e8'



 
 export const getSearchResults = (num,q,searchType) => {
    return fetch(`${baseUrl}?key=${key}&q=${q}&num=${num}&cx=${cx}&searchType=${searchType}`)
      .then((res) => res.json())
  };


