import React, {FC} from 'react';

interface Props {
	text: string;
	onClick: () => void;
}

const ActionButton: FC<Props> = ({text, onClick}: Props) => {

	return (
		<button type='button' onClick={onClick} className="action_btn">{text}</button>
	);
};

export default ActionButton;
