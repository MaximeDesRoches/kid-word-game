
// @ts-check
import sha1 from 'sha1';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAppDispatch } from '../config/store';

type IReducerStates = 'pending' | 'fulfilled' | 'rejected';
type IUserReducer<StateType, ActionType> = (state:StateType, action: { meta:any, payload: ActionType }) => StateType | void;
type IUserReducers<StateType, ActionType = StateType | void> = Partial<Record<IReducerStates, IUserReducer<StateType, ActionType>>>;

/**
	Creates a thunk action that cannot be called with the same parameters before the previous identical one is resolved
	Returns the redux action, with reducers as property, that can be added to extraReducers of slice creator.
*/
export default function createDebouncedAsyncAction<StateType = any, ActionType = any>(name:string, promiseCreator:(...args:any) => PromiseLike<ActionType>, userReducers:IUserReducers<StateType, ActionType> = {}) {
	const processing:{ [key:string]: Promise<any> | null } = {};
	const thunk = createAsyncThunk(
		name,
		promiseCreator
	);
	
	const debounced = (data = {}) => {
		return (dispatch:IAppDispatch) => {
			const hash = sha1(JSON.stringify(data || {}));
			if (Boolean(processing[hash])) {
				return processing[hash];
			}
			
			processing[hash] = dispatch(thunk(data)).then(r => {
				processing[hash] = null;
				return r;
			}).catch(err => {
				processing[hash] = null;
				throw err;
			});
			return processing[hash];
		};
	};

	debounced.actions = thunk;

	debounced.reducers = Object.entries(userReducers).reduce((carry, [key, reducer]) => {
		carry[thunk[key as IReducerStates].type] = reducer;
		return carry;
	}, {} as { [key:string]: IUserReducer<StateType, ActionType> });

	return debounced;
}