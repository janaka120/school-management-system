import { Student, FormMode } from './Student';

export interface StudentState {
	// list
	studentList: Array<Student>;
	isInProgress: boolean; //list fetch
	mode: FormMode;
	// add-edit mode form object
	student: Student | null;
}
