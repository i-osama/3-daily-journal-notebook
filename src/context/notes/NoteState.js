import react from "react";
import  NoteContext from "./noteContext";

const NoteState = (props)=>{
    state = {
        "name":"Osama",
        "class":"A0"
    }

    return(
        <NoteContext.provider value= {state}>
            {props.children}
        </NoteContext.provider>
    )

}

export default NoteState;