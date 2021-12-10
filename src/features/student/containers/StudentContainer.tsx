import React, {FC} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import {RootState} from '../../../app/Store';
import StudentList from '../components/StudentList';

const StudentContainer: FC = () => {
	const dispatch = useDispatch();
	const {isInProgress} = useSelector((state: RootState) => {
		return {
			isInProgress: state.student.isInProgress,
		};
	}, shallowEqual);

	return (
		<div className="client_container">
			<div className="top_con">
				Add Button
			</div>
			<StudentList />
		</div>
	);
};
export default StudentContainer;
