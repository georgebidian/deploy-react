import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import MatchTestDataService from "../service/MatchTestDataService";
import TournamentDataService from "../service/TournamentDataService";
import FighterDataService from "../service/FighterDataService";
import axios from "axios";

class ScheduleComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dateTimeStart: null,
            location: '',
            matches: [],
            errorMessage: null,
            fighters: 0
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.refreshMatches = this.refreshMatches.bind(this)
        this.deleteMatchClicked = this.deleteMatchClicked.bind(this)
    }

    componentDidMount() {
        FighterDataService.retrieveAllFighters()
            .then(
                response => {
                    this.setState({fighters: response.data.length})
                }
            )
    }

    validate(values) {
        let errors = {}
        if (!values.location) {
            errors.location = 'Enter a location for the event!'
        }
        if (values.dateTimeStart === '') {
            errors.dateTimeStart = 'Enter a date for the event!'
        }
        return errors
    }

    deleteMatchClicked(idMatch) {
        MatchTestDataService.deleteMatch(idMatch)
            .then(
                this.refreshMatches
            )
    }

    onSubmit(values) {
        TournamentDataService.retrieveAllTournaments()
            .then(
                response => {
                    let isUsed = false;
                    let id = -1;
                    for(let tournament of response.data){
                        if(tournament.location === values.location && tournament.dateTimeStart === values.dateTimeStart ){
                            isUsed = true;
                            id = tournament.idTournament;
                            break;
                        }
                    }
                    let tournament = {
                        idTournament: id,
                        location: values.location,
                        dateTimeStart: values.dateTimeStart
                    }
                    if(isUsed == true){
                        MatchTestDataService.createMatch(tournament)
                            .then(this.refreshMatches)
                            .catch(
                                error => {
                                    this.setState({errorMessage: error.response.data})
                                    console.log(this.state.errorMessage)
                                }
                            )
                    }
                    else{
                        axios.put("http://localhost:8080/mma/data/week-reset")
                        TournamentDataService.createTournament2(tournament)
                            .then(
                                response => {
                                    MatchTestDataService.createMatch(response.data)
                                        .then(this.refreshMatches)
                                        .catch(
                                            error => {
                                                this.setState({errorMessage: error.response.data})
                                                console.log(this.state.errorMessage)
                                            }
                                        )
                                }
                            )
                    }
                }
            )

    }

    refreshMatches(){
        MatchTestDataService.retrieveAllMatches()
            .then(
                response =>
                {
                    this.setState({matches: response.data})
                    this.state.matches.map((match) =>
                        FighterDataService.retrieveFighter(match.idFighter1)
                            .then(
                                response => {
                                    match.idFighter1 = `${response.data.firstname} ${response.data.lastname}`
                                    FighterDataService.retrieveFighter(match.idFighter2)
                                        .then(
                                            response => {
                                                match.idFighter2 = `${response.data.firstname} ${response.data.lastname}`
                                                FighterDataService.retrieveFighter(match.winner)
                                                    .then(
                                                        response => {
                                                            match.winner = `${response.data.firstname} ${response.data.lastname}`
                                                            this.setState({match: match})
                                                        }
                                                    )
                                            }
                                        )
                                }
                            )
                    )
                }
            )
    }

    render() {
        const {dateTimeStart, location} = this.state
        return(
            <div className='container'>
                {this.state.errorMessage && <div class="alert alert-danger">{this.state.errorMessage}</div>}
                <Formik
                    initialValues={{ dateTimeStart, location}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="location" component="div"
                                              className="alert alert-warning" />
                                <ErrorMessage name="startDate" component="div"
                                              className="alert alert-warning" />
                                <fieldset className="form-group">
                                    <label>Enter the location of the tournament</label>
                                    <Field className="form-control" type="text" name="location"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Enter the beginning date of the tournament</label>
                                    <Field className="form-control" type="date" name="dateTimeStart"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Schedule</button>
                            </Form>
                        )
                    }
                </Formik>
                <br></br><br></br>
                <div className="table">
                    <thead>
                    <tr>
                        <th>Id Match</th>
                        <th>Id Tournament</th>
                        <th>Fighter 1</th>
                        <th>Fighter 2</th>
                        <th>Winner</th>
                        <th>Rounds</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.matches.map(
                            match =>
                                <tr key={match.id}>
                                    <td>{match.idMatchT}</td>
                                    <td>{match.idTournament}</td>
                                    <td>{match.idFighter1}</td>
                                    <td>{match.idFighter2}</td>
                                    <td>{match.winner}</td>
                                    <td>{match.rounds}</td>
                                    <td>{match.dateTimeStart}</td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteMatchClicked(match.idMatchT)}>Delete</button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </div>
                <button className="btn btn-success" onClick={this.refreshMatches}>Show all matches</button>
            </div>
        )
    }
}

export default ScheduleComponent