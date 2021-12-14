import React, {FC, useMemo} from 'react';

interface Props {
	label: string;
	onChange: (id: string, value: string) => void;
	value: string;
	id: string;
	className?: string;
}

const HoursInput: FC<Props> = ({id, label, value, onChange, className=''}: Props) => {
	
	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.target.value;
		if (getHoursInputRegEx(2, '.').test(newValue) && newValue.length <= 6) {
			onChange(id, newValue);
		}
	}

	const validatedValue = useMemo(() => {
		let newValue = value + '';
		if (getHoursInputRegEx(2, '.').test(newValue) && newValue.length <= 6) {
			return newValue;
		}

		return value; 
	}, [value])

	return (
		<div className={`hours_input ${className}`} >
			<label className='hours_input__label'>{label}</label>
			<input className='hours_input__element' id={id} value={validatedValue} onChange={onChangeHandler} />
		</div>
	);
};

export default HoursInput;

const getRegExCommon = (digits: number, decimalPoint = '.'): string => {
	return `(0|([1-9][0-9]*))?(\\${decimalPoint}\\d{0,${digits}})?`;
};

const getHoursInputRegEx = (digits: number, decimalPoint = '.'): RegExp => {
	if (digits > 0) {
		return new RegExp(`^(${getRegExCommon(digits, decimalPoint)})$`); //    /^((\d+)?(\.\d{0,2})?)$/
	}
	return /^([1-9][0-9]*)$/;
};