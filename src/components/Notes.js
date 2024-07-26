import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    
  const { notes, setNotes } = useContext(noteContext);
  return (
    <div className="row my-3">
    <h3>Your Journals</h3>

    {notes.map((note) => {
        return <NoteItem note={note}/>;
      })}

    {/* {notes.map((note, index) => (
      <div key={index}>{note.title}</div>
    ))} */}

  </div>
  )
}

export default Notes
