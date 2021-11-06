import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import { deleteLike, getSlideLikes } from "../../modules/Likemanager";
import { getSlideLikeByUser } from "../../modules/Likemanager";
import { addLike } from "../../modules/Likemanager";
import firebase from "firebase";

import "./Likes.css"


export const LikesButton = ({slideId}) => {

    const [likes, setLikes] = useState([])
    const [userLike, setUserLike] = useState(undefined)
    const user = firebase.auth().currentUser;
    const firebaseId = user.uid;
    const history = useHistory()
    const location = history.location.pathname


    const handleAddLike = (e) => {
        e.preventDefault();
        const likeObj = {
            slideId: parseInt(slideId),
        };
        console.log(likeObj)
        addLike(likeObj).then(getSlideLikes(slideId)).then(setLikes)
    
    }

    const handleDeleteLike = () => {
        deleteLike(userLike.id).then(setUserLike(undefined))
        console.log(userLike)

    }

    useEffect(()=> {
        getSlideLikes(slideId).then(setLikes)
    },[userLike,location])

    useEffect(()=>{
        if(userLike === undefined){
        getSlideLikeByUser(slideId, firebaseId).then(setUserLike)
        }
       
    },[likes, location])


    return(
        <>
        { userLike === undefined || likes.length === 0 ? (
                  <>
                  <div className="likes-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                      onClick={handleAddLike}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                    </div>
                  </>
                ) : (
                  <>
                  <div className="likes-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                      onClick={handleDeleteLike}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    </div>
                  </>
                )}

          
                <div>{likes.length}</div>


        </>
    )
}