import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getSlideById } from "../../modules/SlideManager";


export const SlideDetails = () => {

    const {slideId} = useParams();

    const [slide,setSlide] = useState({
        dateCreated:'',
        name: '',
        description: "",
        magnification:"",
        microscopeId:"",
        microscope:{
            user:{
                firstName:"",
                lastName:"",
                fullName:''
            }
        }
    });

    const [date,] = slide?.dateCreated.split("T")

    useEffect(()=> {
        getSlideById(slideId).then(setSlide)
    },[])
    return(
        <>
            {console.log(slide)}
            <h1>{slide.name}</h1>
            <h5>{slide.description}</h5>
            <h5>{slide.microscope.user.fullName} </h5>
            <h5>{date}</h5>
        </>
    )
}