import { Student } from './../models/Student';
import { getStudentList, removeStudent, addStudent } from './../services/StudentSvc';
import {
	apiCallStarts,
	apiCallError,
	fetchStudentListSuccess,
	onDeleteSuccess,
	addNewStudentSuccess,
} from '../reducer/StudentReducer';
import {AppDispatch, GetState, AppThunk} from '../../../app/Store';

export const fetchStudentList =
	(): AppThunk =>
	async (dispatch: AppDispatch) => {
		try {
			dispatch(apiCallStarts());
			let response;
			response = await getStudentList();
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(fetchStudentListSuccess(data));
			} else {
				dispatch(apiCallError());
				// showErrorMsg(msg!);
			}
		} catch (e) {}
	};

export const deleteStudent =
	(id: string): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			const {studentList} = getState().student;
			dispatch(apiCallStarts());
			let response;
			response = await removeStudent(id, studentList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(onDeleteSuccess(data));
			} else {
				dispatch(apiCallError());
				// showErrorMsg(msg!);
			}
		} catch (e) {}
	};

export const createStudent =
	(newStudent: Student): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			const {studentList} = getState().student;
			dispatch(apiCallStarts());
			let response;
			response = await addStudent(newStudent, studentList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(addNewStudentSuccess(data));
			} else {
				dispatch(apiCallError());
				// showErrorMsg(msg!);
			}
		} catch (e) {}
	};
