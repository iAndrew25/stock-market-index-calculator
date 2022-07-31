import React, {createContext, useState} from 'react';

const AppContext = createContext();

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