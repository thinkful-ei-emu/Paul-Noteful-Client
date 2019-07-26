import React from 'react';
import { NoteContext } from '../NoteContext';
import ValidationError from '../ValidationError/ValidationError'
import {findFolder} from '../notes-helpers';

import '../NotefulForm/NotefulForm.css';
 

class AddNote extends React.Component{
  static contextType=NoteContext
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
    this.state={
      name:'Sample Note Name',
      content:'lorem ipsum..',
      folderId:this.props.folderId,
      givenFolderId: this.props.folderId,
      folderName:'',
      nameError: true,
      contentError: true,
      folderError: true,
    }
  }
  updateName(name){
    this.setState({name: name})
  }
  updateContent(content){
    this.setState({content: content})
  }
  updateFolder(folderName){
    this.setState({folderName:folderName})
  }
  validateName(fieldValue) {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
  }
  validateContent(fieldValue) {
    const content = this.state.content.trim();
    if (content.length < 3 && content.length >0) {
      return 'If content exists, it must be at least 3 characters long';
    }
  }
  
  validateFolder(folders){
    if(this.state.folderId){
      return;
    }
    let folder=folders.find(folder=> folder.name.toLowerCase()===this.state.folderName.trim().toLowerCase());
    if(!folder)
      return 'Cannot submit, not an existing folder';
  }


  validateFinal(){
    const folders=this.context.folders;
    if(this.validateName()||this.validateContent()||this.validateFolder(folders)){
      return "Cannot submit. Fix the errors";
    }
  }

  handleSubmit(event){
    event.preventDefault();
    if(this.validateFinal()){
      return;
    }
    let folderId= this.state.givenFolderId? 
      this.state.folderId : 
      this.context.folders.find(folder=> folder.name.toLowerCase()===this.state.folderName.trim().toLowerCase()).id;
    this.context.addNote(this.state.name,this.state.content,folderId)

  }
  render(){
    const folders=this.context.folders;
    return(
      <form className='new-note-form Noteful-form' onSubmit={e=> this.handleSubmit(e)}>
        <label htmlFor="noteName">Name of new Note:</label>
        <input type="text" className='new-note-input' name='noteName' id='noteName' value={this.state.name} ref={this.nameInput}  onChange={e => this.updateName(e.target.value)}/>
        <ValidationError message={this.validateName()}/>
        <br></br>
        <label htmlFor="noteContent">Content of new Note:</label>
        <textarea type="text" className='new-note-content' name='noteContent' id='noteContent' value={this.state.content} onChange={e => this.updateContent(e.target.value)}/>
        <ValidationError message={this.validateContent()}/>
        <br></br>
        {
          !this.state.givenFolderId &&(
            <>
              <label htmlFor="noteFolder">Folder of new Note:</label>
              <input type="text" className='new-note-folder' name='noteFolder' id='noteFolder' value={this.state.folderName} onChange={e => this.updateFolder(e.target.value)}/>
              <ValidationError message={this.validateFolder(folders)}/>
              <br></br>
            </>

          )

          
        }
        <button type="submit" className="submit-new-note-button">
            Add Note
        </button>
        <ValidationError message={this.validateFinal()}/>
      </form>
    );
  }
}

export default AddNote;