import React from 'react'

const NoteItem = (props) => {
    const {note} = props;
  return (
    <div className='col-md-3'>
      <div className=" card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description} . Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere eligendi fugiat ratione quas porro quidem reiciendis accusantium fuga odio magni.</p>
  </div>
</div>
    </div>
  )
}

export default NoteItem
