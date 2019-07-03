import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import './App.css';
import {NoteContext} from '../NoteContext'

class App extends Component {
    
    state = {
        deleteNote: () => {},
        addNotes: () => {},
        addFolders: () => {},
        notes: [],
        folders: []
    };




    componentDidMount() {
        // fake date loading from API call
        Promise.all([fetch('http://localhost:9090/folders'),
        fetch('http://localhost:9090/notes')])
        .then(responses => {
            return Promise.all([responses[0].json(),responses[1].json()])
        })
        .then(responseJsons => { 
            this.setState({
                notes:responseJsons[1],
                folders:responseJsons[0]
            }
            )
        })

    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                // folders={folders}
                                // notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        return <NotePageNav {...routeProps} noteId={routeProps.match.params} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    folderId={folderId}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        return <NotePageMain {...routeProps} noteId={noteId} />;
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <NoteContext.Provider value = {
                this.state
            }>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </NoteContext.Provider>    
        );
    }
}

export default App;
