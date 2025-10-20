import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Remplacez par l'URL de votre API Laravel
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

export default instance;
