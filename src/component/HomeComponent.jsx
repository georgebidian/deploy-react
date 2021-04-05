import React, {Component} from 'react';

class HomeComponent extends Component{

    constructor(props) {
        super(props);
        this.fighterClicked = this.fighterClicked.bind(this);
        this.administratorClicked = this.administratorClicked.bind(this);
    }

    fighterClicked(){
        this.props.history.push('/fighter/register')
    }

    administratorClicked(){
        this.props.history.push('/administrator')
    }

    render() {
        return(
        <div className='container'>
            <h2>Select what type of user you are</h2>
            <button className="btn btn-success" onClick={() => this.fighterClicked()}>Fighter</button>
            <button className="btn btn-warning" onClick={() => this.administratorClicked()}>Administrator</button>
        </div>
        )
    }
}

export default HomeComponent