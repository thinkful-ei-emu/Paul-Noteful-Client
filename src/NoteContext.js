import React from "react"
   
export const NoteContext = React.createContext({
        deleteNote: () =>{},
        addNote: () => {},
        addFolder: () => {},       
        notes: [],
        folders: []
    })

