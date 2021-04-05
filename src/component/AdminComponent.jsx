import React, {Component} from 'react';

class AdminComponent extends Component{

    constructor(props) {
        super(props);
        this.fightersClicked = this.fightersClicked.bind(this);
        this.covidTestsClicked = this.covidTestsClicked.bind(this);
        this.tournamentsClicked = this.tournamentsClicked.bind(this)
        this.matchesClicked = this.matchesClicked.bind(this)
        this.scheduleFighters = this.scheduleFighters.bind(this)
    }

    fightersClicked(){
        this.props.history.push('/fighters')
    }

    covidTestsClicked(){
        this.props.history.push('/covidtests')
    }

    tournamentsClicked(){
        this.props.history.push("/tournaments")
    }

    matchesClicked(){
        this.props.history.push("/matches")
    }

    scheduleFighters(){
        this.props.history.push("/schedule")
    }

    render() {
        return(
        <div className='container'>
            <h2>Select the table you want to see</h2>
            <button className="btn btn-success" onClick={() => this.tournamentsClicked()}>Tournaments </button>
            <button className="btn btn-warning" onClick={() => this.covidTestsClicked()}>Covid Tests</button>
            <button className="btn btn-success" onClick={() => this.fightersClicked()}>Fighters</button>
            <br></br><br></br><br></br>
            <button className="btn btn-success" onClick={() => this.scheduleFighters()}>Schedule fighters!</button>
        </div>
        )
    }
}

export default AdminComponent