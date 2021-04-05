import axios from 'axios';

const API_URL = "http://localhost:8080/mma/data"

class CovidTestDataService {
    retrieveAllCovidTests(){
        return axios.get(`${API_URL}/covidtests`);
    }
    deleteCovidTest(idCovidTest){
        return axios.delete(`${API_URL}/deleteCovidTest/${idCovidTest}`)
    }
    retrieveCovidTest(idCovidTest) {
        return axios.get(`${API_URL}/covidtests/${idCovidTest}`);
    }
    updateCovidTest(idCovidTest, covidTest) {
        return axios.put(`${API_URL}/covidtests/${idCovidTest}`, covidTest);
    }

    createCovidTest(covidTest) {
        return axios.post(`${API_URL}/covidtests/`, covidTest);
    }
}

export default new CovidTestDataService()