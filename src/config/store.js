import React, {createContext, useState} from 'react';

const AppContext = createContext();

	// Server index
    // "country": "ro",
    // "currency": "lei",
    // "currencyPlacement": "right",
    // "id": "ro_BET-20",
    // "isActive": "1",
    // "lastUpdated": "11/15/2022",
    // "name": "Bucharest Exchange Trading",
    // "symbol": "BET-20"

	// Server company
    // "id": "BET-20_TLV",
    // "marketIndex": "BET-20",
    // "name": "BANCA TRANSILVANIA S.A.",
    // "symbol": "TLV",
    // "weight": "20.93"

	// Local index
	// id: '',
	// label: '',
	// color: '',
	// symbol: '',
	// country: '',
	// currency: '',
	// companies: [],
	// isNewIndex: false,
	// currencyPlacement: '',
	// isTrackingAllCompanies: false


function AppStore({children}) {
	const store = useState({});

	return (
		<AppContext.Provider value={store}>
			{children}
		</AppContext.Provider>
	)
}

export {AppContext};
export default AppStore;