import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react/cjs/react.development";
import { getNotesBySlideId } from "../../modules/NotesManager";
import { getSlideById } from "../../modules/SlideManager";
import { NoteCard } from "../Notes/NotesCard";


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
    const [notes, setNotes] = useState([]);

    const [date,] = slide?.dateCreated.split("T")

    useEffect(()=> {
        getSlideById(slideId).then(setSlide).then(getNotesBySlideId(slideId).then(setNotes))
    },[])
    return(
        <>
            {console.log(slide)}
            {console.log(notes)}
            <div className="slide-detail-container">
            <img className="slide-detail-img" src={slide.imageUrl} alt={slide.name} />
            <h1>{slide.name}</h1>
            <h5>{slide.microscope.make} {slide.microscope.model} </h5>
            <h5>{slide.magnification}</h5>
            <h5>{slide.description}</h5>
            <h5>{slide.microscope.user.fullName} </h5>
            <h5>{date}</h5>
            <div> Comments</div>
            <div>{notes.length !== 0 ? notes.map(note=> {
               return  <NoteCard key={note.id} note={note} />
            }) : <div>No Comments</div>}</div>
            </div>
        </>
    )
}