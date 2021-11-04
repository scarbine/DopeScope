import React from "react";
import { NoteCard } from "./NotesCard";

export const NotesList = (props) => {
  return (
    <div className="note-card-div">
      <div className="note-card-wrapper">
        {props.notes?.length !== 0 ? (
          props.notes?.map((note) => {
            return <NoteCard key={note.id} note={note} />;
          })
        ) : (
          <div>No Comments</div>
        )}
      </div>
    </div>
  );
};
