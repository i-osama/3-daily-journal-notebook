import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
      
  const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:"default"})
  const { notes, getNotes, editNote } = useContext(noteContext);
  useEffect(()=>{
    getNotes();
  },[]);

  const updateNote=(currentNote)=>{
    modalRef.current.click();

    setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    
  }
  const modalRef = useRef(null)
  const refClose = useRef(null)


  const handleClick = (element)=>{
    // element.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    
    props.showAlert("Note Updated successfully", 'success')
  
  }

  const onChange = (element)=>{
    setNote({...note, [element.target.name]:element.target.value})
  }

  return (
    <>
    <AddNote/>
    <div className="row my-3">


<button type="button" ref={modalRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='mx-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp"  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription}  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
          </div>
{/*        
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button> */}
        </form>
      </div>
      <div className="modal-footer">
        <button type="button"  ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>


{/* ---- */}
<h3>Your Journals</h3>
  <div className="container mx-2">
    {notes.length===0&&"No Journal to display"}
    </div>

      {notes.map((note) => {
        return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
      })}

    {/* {notes.map((note, index) => (
      <div key={index}>{note.title}</div>
    ))} */}



  </div>
  </>
  )
}

export default Notes
