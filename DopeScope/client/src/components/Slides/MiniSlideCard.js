import React from "react";
import { useHistory } from "react-router";
import { Container } from "reactstrap";
import { getScopesByUserId } from "../../modules/MicroscopeManager";


export const MiniSlideCard = (props) => {
    const history = useHistory()
    const handleClick =()=>{
        history.push(`/slide/${props.slide.id}`)
    }
    return(
        <>
            <container className="slide-card-mini" onClick={handleClick}>
                <div className="left-box">
                    <div>{props.slide.name}</div>
                </div>
                <div className="center-box">
                <img className="mini-slide-img" src={props.slide.imageUrl} alt={props.slide.name} />
                </div>
                <div className="right-box">
                    <div>{props.slide.microscope.user.fullName}</div>
                </div>
            </container>
        </>
    )
}