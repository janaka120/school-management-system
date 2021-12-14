import React from 'react';

const MainLayout: React.FC = ({children}: any) => {
	return (
		<div className='main-container'>
			{children}
		</div>
	);
};

export default MainLayout;
