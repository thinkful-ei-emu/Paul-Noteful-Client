import React from "react"
   
export const NoteContext = React.createContext({
        setNotes: () => {},
        setFolders: () => {},       
        notes: [],
        folders: []
    })

