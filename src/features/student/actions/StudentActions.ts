import { Student } from './../models/Student';
import { getStudentList, removeStudent, addStudent, saveStudents } from './../services/StudentSvc';
import {
	apiCallStarts,
	apiCallError,
	fetchStudentListSuccess,
	onDeleteSuccess,
	addNewStudentSuccess,
	saveAllStudentSuccess,
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
		} catch (e) {
			console.log("create student  action error >>>", e);
		}
	};

export const saveAllStudents =
	(studentList: Student[]): AppThunk =>
	async (dispatch: AppDispatch, getState: GetState) => {
		try {
			dispatch(apiCallStarts());
			let response;
			response = await saveStudents(studentList);
			const {success, data, msg} = response;
			if (success && data) {
				dispatch(saveAllStudentSuccess(data));
			} else {
				dispatch(apiCallError());
				// showErrorMsg(msg!);
			}
		} catch (e) {}
	};
