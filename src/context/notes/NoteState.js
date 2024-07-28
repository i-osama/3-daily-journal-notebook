import  { useState } from "react";
import  NoteContext from "./noteContext";
import { tab } from "@testing-library/user-event/dist/tab";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const initialNotes = [];

      const [notes, setNotes] = useState(initialNotes);

      // get all note
      const getNotes = async ()=>{
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
          method: 'GET',
          
          headers: {
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
          },
         
        });
        const json = await response.json()
        console.log(json)
        setNotes(json);

       }

      // Add a note
      const addNote= async (title, description, tag)=>{
        // TODO: API Call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
          method: 'POST',
          
          headers: {
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
          },
          body: JSON.stringify({title, description, tag})
        });

        const json= response.json();

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
      const editNote= async (id, title, description, tag)=>{
        // TODO API CALL 
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
          method: 'PUT',
          
          headers: {
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
          },
          body: JSON.stringify({title, description, tag})
        });

        const json= response.json();

        for(let index=0;index<notes.length; index++){
          const element = notes[index]
          if (element._id===id) {
            element.title = title;
            element.description = description;
            element.tag = tag;

          }
        }

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
        <NoteContext.Provider value= {{notes,getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;