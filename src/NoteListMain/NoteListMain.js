import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import { NoteContext } from '../NoteContext';
import {getNotesForFolder} from '../notes-helpers';
import './NoteListMain.css';
import PropTypes from 'prop-types';

export default class NoteListMain extends React.Component {
  static contextType=NoteContext
  render() {
    const linkToAddNote= this.props.folderId? `/add-note/${this.props.folderId}` : '/add-note';
    const notesForFolder = getNotesForFolder(
      this.context.notes,
      this.props.folderId
    );
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to={linkToAddNote}
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
        </CircleButton>
        </div>
      </section>
    )
  }
}

NoteListMain.defaultProps = {
  notes: [],
}

NoteListMain.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  folderId: PropTypes.string
}