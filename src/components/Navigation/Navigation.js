import React from 'react';

const Navigation = () => {
	return (
		<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
			<p className='f3 dim link black underline pa3 pointer'>Sign Out</p>
		</nav>
	);
};

export default Navigation;

//! In the nav style, the justify-content of CSS becomes justifyContent in React inline styling, because - cannot be used in object properties
