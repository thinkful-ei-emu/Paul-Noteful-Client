import React from 'react';
import { NoteContext } from '../NoteContext';
import ValidationError from '../ValidationError/ValidationError'
import '../NotefulForm/NotefulForm.css';
import PropTypes from 'prop-types'

class AddFolder extends React.Component{
  constructor(props) {
    super(props);
    this.nameInput = React.createRef();
  }
  state={
    name:'Sample Name',
  }
  updateName(name){
    this.setState({name: name})
  }
  validateName(folders) {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return 'Name is required';
    } else if (name.length < 3) {
      return 'Name must be at least 3 characters long';
    }
    else if(folders.length!==0 && folders.find(folder=>folder.name===name)){
      return 'Name already taken by another folder';
    }
  }
  validateFinal(folders){
    if(this.validateName(folders))
      return "Fix errors";
  }
  handleSubmit(event, folders, addFolder ){
    event.preventDefault();
    if(this.validateFinal(folders)){
      return;
    }
    addFolder(this.state.name);
  }
  static contextType=NoteContext
  render(){
    if(this.props.isLoading){
      return <p>loading</p>
    }
    return(
      <form className='new-folder-form Noteful-form' onSubmit={e=> this.handleSubmit(e,this.context.folders,this.context.addFolder)}>
        <label htmlFor="folderName">Name of new folder:</label>
        <input type="text" className='new-folder-input' name='folderName' id='folderName' value={this.state.name} ref={this.nameInput}  onChange={e => this.updateName(e.target.value)}/>
        <ValidationError message={this.validateName(this.context.folders)}/>
        <button type="submit" className="submit-new-folder-button">
            Add Folder
        </button>
        <ValidationError message={this.validateFinal(this.context.folders)}/>
      </form>
    );
  }
}

AddFolder.propTypes={
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}


export default AddFolder;