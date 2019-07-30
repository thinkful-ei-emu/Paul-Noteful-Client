import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { findFolder} from '../notes-helpers';
import {NoteContext} from '../NoteContext'
import '../NotePageNav/NotePageNav.css';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom'
import { countNotesForFolder } from '../notes-helpers';

export default class AddNoteNav extends React.Component{
  static contextType=NoteContext
  render(){
    if(this.props.isLoading){
      return <p>loading</p>
    }
    const {notes,folders} =this.context;
    const folder = findFolder(folders, this.props.folderId);
    const conditional = folder? ( 
      <h3 className='NotePageNav__folder-name'>
        {folder.name}
      </h3>
    )  :    <ul className='NoteListNav__list'>

    {folders && folders.map(folder =>
      <li key={folder.id}>
        <NavLink
          className='NoteListNav__folder-link'
          to={`/folder/${folder.id}`}
        >
          <span className='NoteListNav__num-notes'>
            {countNotesForFolder(notes, folder.id)}
          </span>
          {folder.name}
        </NavLink>
      </li>
    )}
  </ul>;

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
        {conditional}
      </div>
    )
  }
}

AddNoteNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}

AddNoteNav.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  folderId: PropTypes.string
}