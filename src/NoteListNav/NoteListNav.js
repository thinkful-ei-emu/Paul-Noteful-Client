import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countNotesForFolder } from '../notes-helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import './NoteListNav.css'
import { NoteContext } from '../NoteContext';
import PropTypes from 'prop-types';


export default class NoteListNav extends React.Component {
  static contextType = NoteContext;
  static defaultProps = {folders: []}
  render() {
    if(this.props.isLoading){
      return <p>loading</p>
    }
    const { notes, folders } = this.context
    return (
      <>{
         
      
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>

          {folders.length!==0 && folders.map(folder =>
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
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
        </CircleButton>
        </div>
      </div>
      }
      </>
    )
  }
}

NoteListNav.defaultProps = {
  folders: []
}


NoteListNav.propTypes={
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
}