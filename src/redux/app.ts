import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_LANG } from '../Constants';

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
		lang: DEFAULT_LANG,
		appMode: '',
		isDataLoaded: false,
	},
});

export default app;

export const { setAppMode, setDataLoaded } = app.actions;
