import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import {NoteContext} from '../NoteContext'
import '../NotePageNav/NotePageNav.css';
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom'
import { countNotesForFolder } from '../notes-helpers';

export default class AddFolderNav extends React.Component{
  static contextType=NoteContext
  render(){
    if(this.props.isLoading){
      return <p>loading</p>
    }
    const { notes, folders } = this.context
    
    return (
      
      <div className='NoteListNav'>
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
        {folders.length!==0 && <ul className='NoteListNav__list'>

          {folders.map(folder =>
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
        </ul>}
      </div>
    )
  }
}

AddFolderNav.defaultProps = {
  history: {
    goBack: () => { }
  }
}

AddFolderNav.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}