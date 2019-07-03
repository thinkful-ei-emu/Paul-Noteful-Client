import React from 'react'
import NoteFromNotePage from '../Note/NoteFromNotePage'
import { NoteContext } from '../NoteContext';
import {findNote} from '../notes-helpers';
import './NotePageMain.css'

export default class NotePageMain extends React.Component {
  static contextType=NoteContext
  render() {
    
    const note = findNote(this.context.notes, this.props.noteId);
    return (
      <section className='NotePageMain'>
        <NoteFromNotePage
          id={note.id}
          name={note.name}
          modified={note.modified}
          history={this.props.history}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
