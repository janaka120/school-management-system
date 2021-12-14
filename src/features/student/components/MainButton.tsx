import React, {FC, useMemo, useState} from 'react';

interface Props {
	text: string;
	onClick: () => void;
}

const MainButton: FC<Props> = ({text, onClick}: Props) => {

	return (
		<button type='button' onClick={onClick} className="main_btn">{text}</button>
	);
};

export default MainButton;
