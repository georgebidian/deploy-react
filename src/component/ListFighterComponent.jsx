import React, { Component } from 'react';
import FighterDataService from "../service/FighterDataService";

class ListFighterComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            fighters: [],
            message: null
        }
        this.refreshFighters = this.refreshFighters.bind(this);
        this.deleteFighterClicked = this.deleteFighterClicked.bind(this)
        this.updateFighterClicked = this.updateFighterClicked.bind(this)
        this.addFighterClicked = this.addFighterClicked.bind(this)
    }

    componentDidMount() {
        this.refreshFighters();
    }

    refreshFighters(){
        FighterDataService.retrieveAllFighters()
            .then(
                response => {
                    this.setState({ fighters: response.data})
                }
            )
    }

    deleteFighterClicked(idFighter) {
        FighterDataService.deleteFighter(idFighter)
            .then(
                response => {
                    this.setState({ message: `Delete of fighter ${idFighter} Successful` })
                    this.refreshFighters()
                }
            )

    }

    updateFighterClicked(idFighter){
        console.log('update ' + idFighter);
        this.props.history.push(`/fighters/${idFighter}`);
    }

    addFighterClicked(){
        this.props.history.push(`/fighters/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Fighters</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Weight</th>
                            <th>Initial Test Id</th>
                            <th>Second Test Id</th>
                            <th>Quarantined</th>
                            <th>Wins</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.fighters.map(
                                fighter =>
                                    <tr key={fighter.id}>
                                        <td>{fighter.idFighter}</td>
                                        <td>{fighter.firstname}</td>
                                        <td>{fighter.lastname}</td>
                                        <td>{fighter.weight}</td>
                                        <td>{fighter.initialTestId}</td>
                                        <td>{fighter.secondTestId}</td>
                                        <td>{fighter.inQuarantine.toString()}</td>
                                        <td>{fighter.wins}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteFighterClicked(fighter.idFighter)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.updateFighterClicked(fighter.idFighter)}>Update</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addFighterClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListFighterComponent