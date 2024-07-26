import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const myContext = useContext(noteContext);

  useEffect(()=>{
    myContext.update();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      This is {myContext.state.name} and he is from class {myContext.state.class}
    </div>
  )
}

export default About
