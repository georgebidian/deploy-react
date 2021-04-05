import axios from 'axios';

const API_URL = "http://localhost:8080/mma/data"

class TournamentDataService {
    retrieveAllTournaments(){
        return axios.get(`${API_URL}/tournaments`);
    }
    deleteTournament(idTournament){
        return axios.delete(`${API_URL}/deleteTournament/${idTournament}`)
    }
    retrieveTournament(idTournament) {
        return axios.get(`${API_URL}/tournaments/${idTournament}`);
    }
    updateTournament(idTournament, tournament) {
        return axios.put(`${API_URL}/tournaments/${idTournament}`, tournament);
    }

    createTournament(tournament) {
        return axios.post(`${API_URL}/tournaments/`, tournament);
    }

    createTournament2(tournament) {
        return axios.post(`${API_URL}/addTournament2/`, tournament);
    }
}

export default new TournamentDataService()