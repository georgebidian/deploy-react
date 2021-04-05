import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TournamentDataService from "../service/TournamentDataService";

class TournamentComponent extends Component{

    constructor(props) {
        super(props)

        this.state = {
            idTournament: this.props.match.params.idTournament,
            location: '',
            dateTimeStart: null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {

        let tournament = {
            idTournament: parseInt(this.state.idTournament),
            location: values.location,
            dateTimeStart: values.dateTimeStart
        }
        console.log(this.state.idTournament)
        if(this.state.idTournament == -1){
            TournamentDataService.createTournament(tournament)
                .then(() => this.props.history.push('/tournaments'))
        }else{
            TournamentDataService.updateTournament(tournament.idTournament, tournament)
                .then(() => this.props.history.push('/tournaments'))
        }
    }

    componentDidMount() {
        if (this.state.idTournament === -1) {
            return;
        }
        TournamentDataService.retrieveTournament(this.state.idTournament)
            .then(
                response =>
                    this.setState({
                        location: response.data.location,
                        dateTimeStart: response.data.dateTimeStart
                    }));
    }

    validate(values) {
        let errors = {}
        if (!values.location) {
            errors.location = 'Enter a location'
        }
        if(!values.dateTimeStart){
            errors.dateTimeStart = 'Enter a Date Time Start value'
        }

        return errors
    }

    render() {
        let { idTournament, location, dateTimeStart } = this.state
        return (
            <div>
                <h3>Tournament</h3>
                <div className="container">
                    <Formik
                        initialValues={{ idTournament, location, dateTimeStart }}
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
                                    <ErrorMessage name="dateTimeStart" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="idTournament" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Location</label>
                                        <Field className="form-control" type="text" name="location"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Date Time Start</label>
                                        <Field className="form-control" type="date" name="dateTimeStart"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
        )
    }
}

export default TournamentComponent