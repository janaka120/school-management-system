import { StudentPageResponse } from './../models/Student';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {StudentState} from '../models/StudentReducerState';

const initialState: StudentState = {
	//list
	studentList: [],
	isInProgress: false,
	//form
	mode: 'ADD',
	student: null,
};

export const StudentReducer = createSlice({
	name: 'student',
	initialState,
	reducers: {
		
		// --- fetch client list ---
		apiCallStarts: (state) => {
			state.isInProgress = true;
		},
		apiCallError: (state, action: PayloadAction) => {
			state.isInProgress = false;
		},
		addNewStudentSuccess: (state, action: PayloadAction<StudentPageResponse>) => {
			state.studentList = action.payload;
			state.isInProgress = false;
		},
		saveAllStudentSuccess: (state, action: PayloadAction<StudentPageResponse>) => {
			state.studentList = action.payload;
			state.isInProgress = false;
		},
		fetchStudentListSuccess: (state, action: PayloadAction<StudentPageResponse>) => {
			state.studentList = action.payload;
			state.isInProgress = false;
		},
		onFormCancel: (state) => {
			state.student = null;
			state.mode = 'ADD';
		},
		onDeleteSuccess: (state, action: PayloadAction<StudentPageResponse>) => {
			// list
			state.studentList = action.payload;
			state.isInProgress = false;
		},
	},
});

export const {
	apiCallStarts,
	apiCallError,
	fetchStudentListSuccess,
	addNewStudentSuccess,
	onFormCancel,
	onDeleteSuccess,
	saveAllStudentSuccess
} = StudentReducer.actions;

export default StudentReducer.reducer;

