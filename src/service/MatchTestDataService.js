import axios from 'axios';

const API_URL = "http://localhost:8080/mma/data"

class MatchTestDataService {
    retrieveAllMatches(){
        return axios.get(`${API_URL}/matches`);
    }
    deleteMatch(idMatch){
        return axios.delete(`${API_URL}/deleteMatch/${idMatch}`)
    }
    retrieveCovidTest(idMatch) {
        return axios.get(`${API_URL}/matches/${idMatch}`);
    }
    updateMatch(idMatch, match) {
        return axios.put(`${API_URL}/matches/${idMatch}`, match);
    }

    createMatch(tournament) {
        return axios.post(`${API_URL}/matches`,  tournament);
    }
}

export default new MatchTestDataService()