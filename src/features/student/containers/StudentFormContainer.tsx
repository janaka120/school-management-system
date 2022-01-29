import React, {FC, useState} from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

import CloseIcon from '../../../asset/images/close_icon.png'
import AmountInput from '../components/AmountInput';
import HoursInput from '../components/HoursInput';
import MainButton from '../components/MainButton';
import MainInput from '../components/MainInput';
import { Student, emptyStudent } from '../models/Student';
import { createStudent } from '../actions/StudentActions';

const StudentFormContainer: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [studentInfo, setStudentInfo] = useState(emptyStudent)

	const onChangeTextHandler = (id: string, value: string) => {
		setStudentInfo({...studentInfo, [id]: value});
	}

	const onChangePriceHandler = (id: string, value: string, ccy: string) => {
		setStudentInfo({...studentInfo, [id]: {
			ccy,
			amount: value,
		}});
	}

	const onClickHandler = () => {
		const data: Student = {
			...studentInfo,
			id: generateUuid(),
		}
		dispatch(createStudent(data));
	}

	const onClickCancel = () => {
		history.goBack();
	}

	return (
		<div className='student_form_container'>
			<div className='form'>
				<div className='form__header'>
					<span>Add Student</span>
					<button className='close_btn' onClick={onClickCancel}>
						<img src={CloseIcon} width={15} height={15} alt='close' />
					</button>
				</div>
				<div className='form__body'>
					<MainInput label='First Name' onChange={onChangeTextHandler} value={studentInfo.firstName} id='firstName' className='first_name' />
					<MainInput label='Last Name' onChange={onChangeTextHandler} value={studentInfo.lastName} id='lastName' className='last_name' />
					<MainInput label='Date of Birth' onChange={onChangeTextHandler} value={studentInfo.dob} id='dob' type='date' className='date' />
					<MainInput label='Course Name' onChange={onChangeTextHandler} value={studentInfo.courseName} id='courseName' inputClassName='main_input__element--long' className='course_name' />
					<HoursInput label='Hours' onChange={onChangeTextHandler} value={studentInfo.hours} id='hours' className='hours' />
					<AmountInput label='Price' onChange={onChangePriceHandler} value={studentInfo.price.amount} id='price' ccy='EUR' className="price" />
				</div>
				<div className='form__footer'>
					<MainButton text="Save" onClick={onClickHandler} />
				</div>
			</div>
		</div>
	);
};

export default StudentFormContainer;

const generateUuid = () => new Date().getTime().toString(); 