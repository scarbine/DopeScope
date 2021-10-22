import React from "react";
import { Container } from "reactstrap";
import { getScopesByUserId } from "../../modules/MicroscopeManager";


export const MiniSlideCard = (props) => {
    return(
        <>
            <container className="slide-card-mini">
                <div className="left-box">
                    <div>{props.slide.name}</div>
                </div>
                <div className="center-box">
                <img className="mini-slide-img" src={props.slide.imageUrl} alt={props.slide.name} />
                </div>
                <div className="right-box">
                    <div>{props.slide.magnification}</div>
                </div>
            </container>
        </>
    )
}