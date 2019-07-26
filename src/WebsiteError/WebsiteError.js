import React from 'react';
import { Link } from 'react-router-dom';

export default class  WebsiteError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render(){
    if(this.state.hasError) {
      return (
        <>
          <h2>Sorry, we encountered an error!</h2>
          <p>Try clicking on the link below then refreshing the browser</p>
          <Link to="/">Noteful</Link>
        </>
      );
    }
  
    return this.props.children;

  }
  
}