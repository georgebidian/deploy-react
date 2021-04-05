import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import CovidTestDataService from "../service/CovidTestDataService";

class CovidTestComponent extends Component{

    constructor(props) {
        super(props)

        this.state = {
            idCovidTest: this.props.match.params.idCovidTest,
            testDate: null,
            result: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let covidTest = {
            idCovidTest: parseInt(this.state.idCovidTest),
            testDate: values.testDate,
            result: values.result === 'true'
        }
        if(this.state.idCovidTest === -1){
            CovidTestDataService.createCovidTest(covidTest)
                .then(() => this.props.history.push('/covidtests'))
        }else{
            CovidTestDataService.updateCovidTest(this.state.idCovidTest, covidTest)
                .then(() => this.props.history.push('/covidtests'))
        }
    }

    componentDidMount() {
        if (this.state.idCovidTest == -1) {
            return;
        }
        CovidTestDataService.retrieveCovidTest(this.state.idCovidTest)
            .then(
                response =>
                    this.setState({
                        testDate: response.data.testDate,
                        result: response.data.result
                    }));
    }

    validate(values) {
        let errors = {}
        if (!values.testDate) {
            errors.testDate = 'Enter a Test Date'
        }
        if (values.result === '') {
            errors.result = 'Enter a result'
        }
        else if(values.result !== "true" && values.result !== "false"){
            errors.result = 'Enter a correct result\nType true or false'
        }
        return errors
    }

    render() {
        let { idCovidTest, testDate, result } = this.state
        return (
            <div>
                <h3>Covid Test</h3>
                <div className="container">
                    <Formik
                        initialValues={{ idCovidTest, testDate, result }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="testDate" component="div"
                                                  className="alert alert-warning" />
                                    <ErrorMessage name="result" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="idCovidTest" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Test Date</label>
                                        <Field className="form-control" type="date" name="testDate"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Result</label>
                                        <Field className="form-control" type="text" name="result"/>
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

export default CovidTestComponent