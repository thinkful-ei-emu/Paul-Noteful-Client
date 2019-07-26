import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {findNote, findFolder} from '../notes-helpers';
import {NoteContext} from '../NoteContext'
import './NotePageNav.css';
import PropTypes from 'prop-types';

export default class NotePageNav extends React.Component{
  static contextType=NoteContext
  render(){
    const note = findNote(this.context.notes, this.props.noteId) || {};
    const folder = findFolder(this.context.folders, note.folderId);
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
      </CircleButton>
        {folder && (
          <h3 className='NotePageNav__folder-name'>
            {folder.name}
          </h3>
        )}
      </div>
    )
  }
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}

NotePageNav.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  noteId: PropTypes.string.isRequired
}