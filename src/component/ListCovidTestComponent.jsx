import React, { Component } from 'react';
import CovidTestDataService from "../service/CovidTestDataService";

class ListCovidTestComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            covidTests: [],
            message: null
        }
        this.refreshCovidTests = this.refreshCovidTests.bind(this);
        this.deleteCovidTestClicked = this.deleteCovidTestClicked.bind(this)
        this.updateCovidTestClicked = this.updateCovidTestClicked.bind(this)
        this.addCovidTestClicked = this.addCovidTestClicked.bind(this)
    }

    componentDidMount() {
        this.refreshCovidTests();
    }

    refreshCovidTests(){
        CovidTestDataService.retrieveAllCovidTests()
            .then(
                response => {
                    this.setState({ covidTests: response.data})
                }
            )
    }

    deleteCovidTestClicked(idCovidTest) {
        CovidTestDataService.deleteCovidTest(idCovidTest)
            .then(
                response => {
                    this.setState({ message: `Delete of covid test ${idCovidTest} Successful` })
                    this.refreshCovidTests()
                }
            )

    }

    updateCovidTestClicked(idCovidTest){
        console.log('update ' + idCovidTest);
        this.props.history.push(`/covidtests/${idCovidTest}`);
    }

    addCovidTestClicked(){
        this.props.history.push(`/covidtests/-1`)
    }

    render() {
        return (
            <div className="container">
                <h3>All Covid Tests</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Test Date</th>
                        <th>Result</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.covidTests.map(
                            covidTest =>
                                <tr key={covidTest.id}>
                                    <td>{covidTest.idCovidTest}</td>
                                    <td>{covidTest.testDate}</td>
                                    <td>{covidTest.result.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => this.deleteCovidTestClicked(covidTest.idCovidTest)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => this.updateCovidTestClicked(covidTest.idCovidTest)}>Update</button></td>
                                </tr>
                        )
                    }
                    </tbody>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addCovidTestClicked}>Add</button>
                </div>
            </div>
        )
    }
}

export default ListCovidTestComponent