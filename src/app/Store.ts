import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {useSelector, TypedUseSelectorHook} from 'react-redux';
import StudentReducer from '../features/student/reducer/StudentReducer';

const store = configureStore({
	reducer: {
		student: StudentReducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
