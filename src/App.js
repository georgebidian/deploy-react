import React, { Component } from 'react';
import './App.css';
import TournamentApp from "./component/TournamentApp";

class App extends Component {
    render() {
        return (
            <div className="container">
                <TournamentApp />
            </div>
        )
    }
}

export default App;
