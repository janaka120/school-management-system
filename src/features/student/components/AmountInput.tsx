import React, {FC, useMemo} from 'react';
import { getCcyDataByCcy } from '../../../utils/CurrencyHelper';
import { addThousandSeparator, removeOnlySepNotDecimalPoint } from '../../../utils/NumberHandler';

interface Props {
	label: string;
	onChange: (id: string, value: string, ccy: string) => void;
	value: string;
	ccy: string;
	id: string;
	className?: string;
	inputClassName?: string;
}

const AmountInput: FC<Props> = ({id, label, value, ccy, onChange, className='', inputClassName='' }: Props) => {

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		// e.target.value
		const newValue = e.target.value; 
		const parsVal = newValue && thousandsSep ? removeOnlySepNotDecimalPoint(newValue, thousandsSep) : (newValue as string);
		
		if (inputRegEx.test(parsVal) && parsVal.length <= 16) {
			onChange(id, parsVal, ccy);
		}
	}

	const {numDecimals, decimalPointSep, thousandsSep, inputRegEx, symbol} = useMemo(() => {
		const {decimalDigits, decimalSeparator, thousandsSeparator, symbol, symbolOnLeft} = getCcyDataByCcy(ccy);
		return {
			numDecimals: decimalDigits,
			decimalPointSep: decimalSeparator,
			thousandsSep: thousandsSeparator,
			inputRegEx: getPositiveInputRegEx(decimalDigits, decimalSeparator),
			symbol
		};
	}, [ccy]);


	const formattedValue = useMemo(() => {
		let newValue = value + '';
		if (newValue && thousandsSep) {
			newValue = addThousandSeparator(newValue, thousandsSep, decimalPointSep);
		}
		return newValue;
	}, [decimalPointSep, thousandsSep, value])

	return (
		<div className={`amount_input ${className}`} >
			<label className='amount_input__label'>{`${label} ${symbol}`}</label>
			<input className={`amount_input__element ${inputClassName}`} id={id} value={formattedValue} onChange={onChangeHandler} />
		</div>
	);
};

export default AmountInput;

const getRegExCommon = (digits: number, decimalPoint = '.'): string => {
	return `(0|([1-9][0-9]*))?(\\${decimalPoint}\\d{0,${digits}})?`;
};

const getPositiveInputRegEx = (digits: number, decimalPoint = '.'): RegExp => {
	if (digits > 0) {
		return new RegExp(`^(${getRegExCommon(digits, decimalPoint)})$`); //    /^((\d+)?(\.\d{0,2})?)$/
	}
	return /^([1-9][0-9]*)$/;
};