import {createContext} from 'react';

const WizzardContext = createContext();
const options = {
	TRACK_INDEX: 'TRACK_INDEX',
	CREATE_INDEX: 'CREATE_INDEX',
	SOME: 'SOME',
	ALL :'ALL',
}

export {
	WizzardContext,
	options
};
