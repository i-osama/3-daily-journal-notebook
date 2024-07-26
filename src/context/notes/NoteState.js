import  { useState } from "react";
import  NoteContext from "./noteContext";

const NoteState = (props)=>{
    const s1 = {
        "name":"Osama",
        "class":"A0"
    }

    const [state, setState] = useState(s1);

    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"Zeeshan",
        "class":"O2"
            })
        }, 1000);
    }

    return(
        // <NoteContext.Provider value= {{state:state, update:update}}>
        <NoteContext.Provider value= {{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;