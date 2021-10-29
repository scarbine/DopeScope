import React from "react";
import { useHistory } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { Container } from "reactstrap";
import { getSlideLikes } from "../../modules/Likemanager";
import { getScopesByUserId } from "../../modules/MicroscopeManager";


export const MiniSlideCard = (props) => {
    const history = useHistory()
    const [likes, setLikes] = useState([])

    const handleClick =()=>{
        history.push(`/slide/${props.slide.id}`)
    }

    useEffect(()=>{
        getSlideLikes(props.slide.id).then(setLikes)
    },[])

    return(
        <>
            <div className="slide-card-mini" onClick={handleClick}>
                <div className="left-box">
                    <div className="left-box-text">{props.slide.name}</div>
                </div>
                <div className="center-box">
                <img className="mini-slide-img" src={props.slide.imageUrl} alt={props.slide.name} />
                </div>
                <div className="right-box">
                    <div>{likes.length}</div>
                    <div >{props.slide.microscope.user.fullName}</div>
                </div>
            </div>
        </>
    )
}