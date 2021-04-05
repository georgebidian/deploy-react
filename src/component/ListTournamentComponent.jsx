import React, { Component } from 'react';
import TournamentDataService from "../service/TournamentDataService";

class ListTournamentComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tournaments: [],
            message: null
        }
        this.refreshTournaments = this.refreshTournaments.bind(this);
        this.deleteTournamentClicked = this.deleteTournamentClicked.bind(this)
        this.updateTournamentClicked = this.updateTournamentClicked.bind(this)
        this.addTournamentClicked = this.addTournamentClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTournaments();
    }

    refreshTournaments(){
        TournamentDataService.retrieveAllTournaments()
            .then(
                response => {
                    this.setState({ tournaments: response.data})
                }
            )
    }

    deleteTournamentClicked(idTournament) {
        TournamentDataService.deleteTournament(idTournament)
            .then(
                response => {
                    this.setState({ message: `Delete of tournament ${idTournament} Successful` })
                    this.refreshTournaments()
                }
            )

    }

    updateTournamentClicked(idTournament){
        console.log('update ' + idTournament);
        this.props.history.push(`/tournaments/${idTournament}`);
    }

    addTournamentClicked(){
        this.props.history.push(`/tournaments/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Tournaments</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Location</th>
                            <th>Date Time Start</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tournaments.map(
                                tournament =>
                                    <tr key={tournament.id}>
                                        <td>{tournament.idTournament}</td>
                                        <td>{tournament.location}</td>
                                        <td>{tournament.dateTimeStart}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTournamentClicked(tournament.idTournament)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTournamentClicked(tournament.idTournament)}>Update</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTournamentClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListTournamentComponent