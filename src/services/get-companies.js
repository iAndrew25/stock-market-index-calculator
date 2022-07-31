import {API_URL} from '../utils/urls';

const getCompanies = indice => fetch(`${API_URL}/companies.php?indice=${indice}`).then(response => response.json());

export {
	getCompanies
};
