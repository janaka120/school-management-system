import { StudentResponse } from '../models/Student';
import { Student, GetStudentListResponse, MSG } from '../models/Student';


export const getStudentList = async () => {
	const returnVal: GetStudentListResponse = {
		success: false,
	};
	try {
		const res = await JSON.parse(window.localStorage.getItem('students')!);
		console.log('--getStudentList--', res);
		if (
			res &&
			Array.isArray(res)
		) {
			const validList: Array<Student> = [];
			res.forEach((itm: Student) => {
				const validObj = validateStudent(itm);
				if (validObj) {
					validList.push(validObj);
				}
			});
			returnVal.success = true;
			returnVal.data =validList;

			if (validList.length !== res.length) {
				console.log('--getStudentList validation issue --', validList.length, res.length);
			}
		} else {
			throw `status_${res.status}`;
		}
	} catch (e) {
		returnVal.msg = MSG.LIST;
	}
	return returnVal;
};

const validateStudent = (itm: Student): Student | null => {
	const {
		id,
		firstName,
		lastName,
		dob,
		courseName,
		hours,
		price
	} = itm;
	if (id && firstName && lastName && dob && courseName && hours && price) {
		return {
			id,
			firstName,
			lastName,
			dob,
			courseName,
			hours,
			price
		};
	}
	return null;
};

export const addStudent = async (newStudent: Student, studentList: Student[]): Promise<StudentResponse> => {
	const returnVal: StudentResponse = {
		success: false,
	};
	try {
		if (!newStudent || !studentList) {
			throw {message: MSG.INVALID_PARAMS};
		}
		const newStudents = [...studentList, newStudent];
		await window.localStorage.setItem('students', JSON.stringify(newStudents));

		returnVal.success = true;
		returnVal.data = newStudents;
	} catch (e) {
		console.log('--saveStudent-- error', e);
		returnVal.msg = MSG.CREATE_FAILED;
	}
	return returnVal;
};

export const saveStudents = async (saveList: Student[]): Promise<StudentResponse> => {
	const returnVal: StudentResponse = {
		success: false,
	};
	try {
		if (!saveList) {
			throw {message: MSG.INVALID_PARAMS};
		}
		await window.localStorage.setItem('students', JSON.stringify(saveList));

		returnVal.success = true;
		returnVal.data = saveList;
	} catch (e) {
		console.log('--saveStudents-- error', e, saveList);
		returnVal.msg = MSG.SAVE_FAILED;
	}
	return returnVal;
};

export const removeStudent = async (id: string, studentList: Student[]): Promise<StudentResponse> => {
	const returnVal: StudentResponse = {
		success: false,
	};
	try {
		if (!id || !studentList) {
			throw {message: MSG.INVALID_PARAMS};
		}

		const newStudentList = studentList.filter(e => e.id !== id);
		await window.localStorage.setItem('students', JSON.stringify(newStudentList));

		returnVal.success = true;
		returnVal.data = newStudentList;
	} catch (e) {
		console.log('--deleteStudent-- error', e);
		returnVal.msg = MSG.DELETE_FAILED;
	}
	return returnVal;
};
