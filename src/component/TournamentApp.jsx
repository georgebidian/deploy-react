import React, { Component } from 'react';
import ListFighterComponent from "./ListFighterComponent";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FighterComponent from "./FighterComponent";
import HomeComponent from "./HomeComponent";
import FighterAppComponent from "./FighterAppComponent";
import ListCovidTestComponent from "./ListCovidTestComponent";
import CovidTestComponent from "./CovidTestComponent";
import ListTournamentComponent from "./ListTournamentComponent";
import TournamentComponent from "./TournamentComponent";
import AdminComponent from "./AdminComponent";
import ScheduleComponent from "./ScheduleComponent";

class TournamentApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>Tournament Application</h1>
                    <Switch>
                        <Route path="/" exact component={HomeComponent} />
                        <Route path="/administrator" exact component={AdminComponent} />
                        <Route path="/fighters" exact component={ListFighterComponent} />
                        <Route path="/fighters/:idFighter" component={FighterComponent} />
                        <Route path="/fighter/register" component={FighterAppComponent} />
                        <Route path="/covidtests" exact component={ListCovidTestComponent} />
                        <Route path="/covidtests/:idCovidTest" component={CovidTestComponent} />
                        <Route path="/tournaments" exact component={ListTournamentComponent} />
                        <Route path="/tournaments/:idTournament" component={TournamentComponent} />
                        <Route path="/schedule" component={ScheduleComponent} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default TournamentApp