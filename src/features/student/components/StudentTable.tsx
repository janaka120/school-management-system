import React, {FC} from 'react';
import { getCcyDataByCcy } from '../../../utils/CurrencyHelper';
import {StudentPageResponse} from '../models/Student';
import ActionButton from './ActionButton';
import {addThousandSeparator} from '../../../utils/NumberHandler';

interface Props {
	data: StudentPageResponse;
}


const StudentTable: FC<Props> = ({data}: Props) => {

	const onClickEditHandler = () => {

	}

	const onClickDeleteHandler = () => {

	}
	return (
		<table className="student_table">
			<tr>
				<th>FIRST NAME</th>
				<th>LAST NAME</th>
				<th>DATE OF BIRTH</th>
				<th>COURSE</th>
				<th>HOURS</th>
				<th>PRICE</th>
				<th></th>
				<th></th>
			</tr>
			{
				data.map(e => {
					const {symbol, thousandsSeparator, decimalSeparator} = getCcyDataByCcy(e.price.ccy);
					return <tr>
						<td>{e.firstName}</td>
						<td>{e.lastName}</td>
						<td>{e.dob}</td>
						<td>{e.courseName}</td>
						<td>{e.hours}</td>
						<td>{`${addThousandSeparator(e.price.amount, thousandsSeparator, decimalSeparator)} ${symbol}`}</td>
						<td><ActionButton text="Edit" onClick={onClickEditHandler} /></td>
						<td><ActionButton text="Delete" onClick={onClickDeleteHandler} /></td>
					</tr>
				})
			}
		</table>
	);
};
export default StudentTable;

