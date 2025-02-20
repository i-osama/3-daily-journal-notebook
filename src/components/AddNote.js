import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
        
  const {  addNote } = useContext(noteContext);
  const [note, setNote] = useState({title:"", description:"", tag:"default"})

  const handleClick = (element)=>{
    element.preventDefault(); // this function prevent the screen from reloading
    addNote(note.title, note.description, note.tag)
    setNote({title:"", description:"", tag:""})
    
  }

  const onChange = (element)=>{
    setNote({...note, [element.target.name]:element.target.value})
  }
  return (
    <div>
         <div className="container my-3">
        <h1>Add a Journal</h1>

        <form className='mx-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"  onChange={onChange} value={note.title} minLength={2} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description'  value={note.description} onChange={onChange} minLength={2} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag'  value={note.tag} onChange={onChange} />
          </div>
       
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
