import  { useState } from "react";
import  NoteContext from "./noteContext";
import { tab } from "@testing-library/user-event/dist/tab";

const NoteState = (props)=>{
 
    const initialNotes = [
        {
          "_id": "66a077d91c8a4f17b8a7fc691",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d80913643508242",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe033",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077d91c8a4f17b8a7fc694",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d80913643508245",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe036",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077d91c8a4f17b8a7fc697",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d80913643508248",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe039",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        }
      ];

      const [notes, setNotes] = useState(initialNotes);

      // Add a note
      const addNote= (title, description, tag)=>{
        // TODO: API Call
        let note=  {
          "_id": "66a078405514ec96b3fffe049",
          "user": "669f3286d61950186e9072c1",
          "title": title,
          "description": description,
          "tag": tag,
          "__v": 0
        };

        setNotes(notes.concat(note));

       }

      // Edit a note 
      const editNote= (id, title, description, tag)=>{

      }

      // Delete a note 
      const deleteNote= (id)=>{

        // TODO: API Call
        console.log("delete note id: "+ id);

        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote);
      }

    return(
        // <NoteContext.Provider value= {{state:state, update:update}}>
        // <NoteContext.Provider value= {{}}>
        <NoteContext.Provider value= {{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;