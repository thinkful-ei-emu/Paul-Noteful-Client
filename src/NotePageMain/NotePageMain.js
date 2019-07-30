import React from 'react'
import NoteFromNotePage from '../Note/NoteFromNotePage'
import { NoteContext } from '../NoteContext';
import {findNote} from '../notes-helpers';
import './NotePageMain.css';
import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {
  static contextType=NoteContext
  render() {
    /* if(!this.context.notes ||this.context.notes.length===0){
      return <p>loading</p>;
    } */
    /* if(this.props.isLoading){
      return <p>loading</p>
    } */
    const note = findNote(this.context.notes, this.props.noteId);
    return (<>
      {note?     
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
          : <> </>}
        </>
    )
  }
}

NotePageMain.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  noteId: PropTypes.string.isRequired
}