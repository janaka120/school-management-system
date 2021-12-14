import React, {FC} from 'react';

interface Props {
	label: string;
	onChange: (id: string, value: string) => void;
	value: string;
	id: string;
	className?: string;
	inputClassName?: string;
	type?: string;
}

const MainInput: FC<Props> = ({id, label, value, onChange, className='', type='text', inputClassName='' }: Props) => {

	return (
		<div className={`main_input ${className}`} >
			<label className='main_input__label'>{label}</label>
			<input className={`main_input__element ${inputClassName}`} type={type} id={id} value={value} onChange={e => onChange(id, e.target.value)} />
		</div>
	);
};

export default MainInput;
