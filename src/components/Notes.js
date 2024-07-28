import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    
  const { notes, getNotes } = useContext(noteContext);
  useEffect(()=>{
    getNotes();
  },[]);
  
  return (
    <>
    <AddNote/>
    <div className="row my-3">
    <h3>Your Journals</h3>

    {notes.map((note) => {
        return <NoteItem key={note._id} note={note}/>;
      })}

    {/* {notes.map((note, index) => (
      <div key={index}>{note.title}</div>
    ))} */}

  </div>
  </>
  )
}

export default Notes
