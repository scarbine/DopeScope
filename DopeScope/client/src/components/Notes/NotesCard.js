import React from "react";
import "./Notes.css"

export const NoteCard = (props) => {
    return (
        <>
            <div className="note-card-container" >
            <div className="note-detail"> {props.note.noteText}</div>
            <div className="note-detail">{props.note.user.fullName}</div>
            </div>
        </>
    )
}