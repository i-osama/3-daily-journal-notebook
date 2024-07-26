import  { useState } from "react";
import  NoteContext from "./noteContext";

const NoteState = (props)=>{
 
    const initialNotes = [
        {
          "_id": "66a077d91c8a4f17b8a7fc69",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d8091364350824",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe03",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077d91c8a4f17b8a7fc69",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d8091364350824",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe03",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077d91c8a4f17b8a7fc69",
          "user": "669f3286d61950186e9072c1",
          "title": "1. My First Day",
          "description": "This is the first trial of my note application.",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a077fa55d8091364350824",
          "user": "669f3286d61950186e9072c1",
          "title": "2. My First Day",
          "description": "This note was created on ",
          "tag": "personal",
          "__v": 0
        },
        {
          "_id": "66a078405514ec96b3fffe03",
          "user": "669f3286d61950186e9072c1",
          "title": "4. My First Day",
          "description": "This note was created on 1721792568485",
          "tag": "personal",
          "__v": 0
        }
      ];

      const [notes, setNotes] = useState(initialNotes);

    return(
        // <NoteContext.Provider value= {{state:state, update:update}}>
        // <NoteContext.Provider value= {{}}>
        <NoteContext.Provider value= {{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;