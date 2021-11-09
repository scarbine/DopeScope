import React from "react";
import { NoteCard } from "./NotesCard";

export const NotesList = ({ notes}) => {

 


  return (
    
       <>
        {notes?.length !== 0 ? (
          notes?.map((note) => {
            return <NoteCard key={note.id} note={note} />;
          })
        ) : (
          <div>No Comments</div>
        )}
        </>
    
  );
};
