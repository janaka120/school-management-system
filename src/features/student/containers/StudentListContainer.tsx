import React, {FC} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {RootState} from '../../../app/Store';
import { RoutePath } from '../../../utils/Constant';
import MainButton from '../components/MainButton';
import StudentList from '../components/StudentTable';

const StudentListContainer: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {isInProgress, studentList} = useSelector((state: RootState) => {
		return {
			isInProgress: state.student.isInProgress,
			studentList: state.student.studentList,
		};
	}, shallowEqual);

	const onClickHandler = () => {
		history.push(`${RoutePath.STUDENT_CREATE_PATH}`);
	}
	console.log("studentList reducer", studentList);
	return (
		<div className="student_list_container">
			<div className="top_con">
				<MainButton text="Add Student" onClick={onClickHandler} />
			</div>
			<StudentList data={studentList} />
		</div>
	);
};
export default StudentListContainer;
