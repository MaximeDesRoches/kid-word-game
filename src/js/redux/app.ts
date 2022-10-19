import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LANG } from '../Constants';
import ns from '../NameSpace';

const app = createSlice({
	name: 'app',
	reducers: {
		setAppMode: (state, action) => {
			state.appMode = action.payload.app_mode;
		},
		setDataLoaded: (state, action) => {
			state.isDataLoaded = action.payload;
		},
	},
	initialState: {
		lang: ns.lang || DEFAULT_LANG,
		appMode: '',
		isDataLoaded: false,
	},
});

export default app;

export const { setAppMode, setDataLoaded } = app.actions;
