import React from "react";

export const NoteCard = (props) => {
    return (
        <>
            <h5> {props.note.noteText}</h5>
            <h5>{props.note.user.fullName}</h5>
        </>
    )
}