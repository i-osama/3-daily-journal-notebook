import  { useState } from "react";
import  NoteContext from "./noteContext";
import { tab } from "@testing-library/user-event/dist/tab";
// import { useNavigate } from "react-router-dom";

const NoteState = (props)=>{
    const host = "http://localhost:5000"
    const initialNotes = [];
    // const useNavigate = useNavigate();

      const [notes, setNotes] = useState(initialNotes);

      // get all note
      const getNotes = async ()=>{
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
          method: 'GET',
          
          headers: {
            'Content-Type':'application/json',
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
            'auth-token': localStorage.getItem('token')         
          },
         
        });
        const json = await response.json()
        console.log(`get all notes function ${json}`)
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
            // 'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });

        const note= await response.json();

        // const allNotesCombined = notes.concat(note);

        // setNotes(notes.concat(note));
        getNotes();

       }

      // Edit a note 
      const editNote= async (id, title, description, tag)=>{
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
          method: 'PUT',
          
          headers: {
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
          },
          body: JSON.stringify({title, description, tag})
        });

        const json= await response.json();
        console.log(`Updated notes ${title}, ${description}, ${tag},`)

        let newNotes = JSON.parse(JSON.stringify(notes));
        for(let index=0;index<newNotes.length; index++){
          const element = newNotes[index]
          if (element._id===id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;

            break;
          };
        }
        setNotes(newNotes)

      }

      // Delete a note 
      const deleteNote= async (id)=>{
            // TODO API CALL 
            const url = `${host}/api/notes/deletenote/${id}`
            const response = await fetch(url, {
              method: 'DELETE',
              
              headers: {
                'Content-Type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5ZjMyODZkNjE5NTAxODZlOTA3MmMxIn0sImlhdCI6MTcyMTc4OTE1M30.asAlCaImNRjcQ-Varew1GVM3sRDvcnc9bBsqqFJp3AQ'
              }
            });
            
        const json= response.json();

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