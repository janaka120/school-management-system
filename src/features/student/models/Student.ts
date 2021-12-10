import { PageResponse } from './../../../app/appModel';
import {ApiPageResponse, ApiResponse, FieldNames, getFieldNameMap} from '../../../app/appModel';

export type StudentAction = 'CREATE' | 'UPDATE' | 'DELETE';

export type FormMode = 'ADD' | 'EDIT' | 'VIEW';

export interface Price {
	ccy: string,
	amount: number,
}

export interface Student {
	id: string;
	firstName: string,
	lastName: string,
	dob: string,
	courseName: string,
	hours: string,
	price: Price,
}

export type StudentRequest<T> = {
	action: StudentAction;
	id: string;
	entity: T | null;
};


export type GetStudentListResponse = ApiPageResponse<Student>;
export type StudentResponse = ApiResponse<Array<Student>>;
export type SaveStudentParam = StudentRequest<Student>;
export type StudentPageResponse = Array<Student>;

export const emptyStudent: Student = {
	id: '',
	firstName: '',
	lastName: '',
	dob: '',
	courseName: '',
	hours: '',
	price: {
		ccy: '',
		amount: 0,
	}
};

export const LABELS = {
	FIRST_NAME: 'First name',
	LAST_NAME: 'Last name',
	DOB: 'DOB',
	COURSE_NAME: 'Course name',
	PRICE: 'Price',
	ID: 'Id',
};

export type StudentFieldNames = FieldNames<Student>;

export const studentMasterFieldNames = getFieldNameMap(emptyStudent) as StudentFieldNames;

export const MSG = {
	LIST: 'Unable to fetch list.',
	INVALID_PARAMS: 'Parameters not supporting.',
	NO_RECORD: 'Unable to fetch the record.',
	SAVE_FAILED: 'Unable to save the records.',
	CREATE_FAILED: 'Unable to add the record.',
	UPDATE_FAILED: 'Unable to update the record.',
	DELETE_FAILED: 'Unable to delete the record.',
};