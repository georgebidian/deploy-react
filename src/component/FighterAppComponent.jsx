import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FighterDataService from "../service/FighterDataService";
import CovidTestDataService from "../service/CovidTestDataService";

class FighterAppComponent extends Component{

    constructor(props) {
        super(props)

        this.state = {
            idFighter: -1,
            firstname: '',
            lastname: '',
            weight: '',
            initialTestId: '0',
            secondTestId: '0',
            inQuarantine: '0',
            wins: '0',
            message: null,
            testDate: null
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let covidTest = {
            idCovidTest: -1,
            testDate: values.testDate,
            result: false
        }
        CovidTestDataService.updateCovidTest(covidTest.idCovidTest, covidTest)
            .then(
                response => {
                    let fighter = {
                        idFighter: parseInt(this.state.idFighter),
                        firstname: values.firstname,
                        lastname: values.lastname,
                        weight: parseInt(values.weight),
                        initialTestId: response.data.idCovidTest,
                        secondTestId: 0,
                        inQuarantine: false,
                        wins: 0
                    }
                    FighterDataService.createFighter(fighter)
                        .then(() => this.setState({ message: "Registered fighter "+ fighter.firstname + " " + fighter.lastname + " successfully" }))
                    console.log(fighter)
                }
            )
    }

    validate(values) {
        let errors = {}
        if (!values.firstname) {
            errors.firstname = 'Enter a firstname'
        }
        if (/[0-9]/.test(values.firstname)){
            errors.firstname = 'Digits can not be added into the First Name field'
        }
        if (!values.lastname) {
            errors.lastname = 'Enter a lastname'
        }
        else if (/[0-9]/.test(values.lastname)){
            errors.lastname = 'Digits can not be added into the Last Name field'
        }
        if (!values.weight) {
            errors.weight = 'Enter a weight'
        }
        else if (/[^0-9]/.test(values.weight)){
            errors.weight = 'Letters can not be added into the Weight field'
        }
        if (!values.testDate) {
            errors.testDate = 'Enter a test date'
        }
        return errors
    }

    render() {
        let { firstname, lastname, weight, initialTestId, secondTestId} = this.state
        return (
            <div>
                <h3>Fighter</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <Formik
                        initialValues={{ firstname, lastname, weight, initialTestId, secondTestId, testDate: null}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="firstname" component="div"
                                                  className="alert alert-warning" />
                                    <ErrorMessage name="lastname" component="div"
                                                  className="alert alert-warning" />
                                    <ErrorMessage name="weight" component="div"
                                                  className="alert alert-warning" />
                                    <ErrorMessage name="testDate" component="div"
                                                  className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>First Name</label>
                                        <Field className="form-control" type="text" name="firstname"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label>
                                        <Field className="form-control" type="text" name="lastname"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Weight</label>
                                        <Field className="form-control" type="text" name="weight" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Initial Covid Test Date</label>
                                        <Field className="form-control" type="date" name="testDate" />
                                        <p>The test must me NEGATIVE!</p>
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

export default FighterAppComponent