import {API_URL} from '../utils/urls';

const getCompanies = marketIndex => fetch(`${API_URL}/companies.php?marketIndex=${marketIndex}`).then(response => response.json());
const getMarketIndexes = () => fetch(`${API_URL}/market-indexes.php`).then(response => response.json());

export {
	getCompanies,
	getMarketIndexes
};
