import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					className='f3 dim link black underline pa3 pointer'
					onClick={() => onRouteChange('signOut')}
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p
					className='f3 dim link black underline pa3 pointer'
					onClick={() => onRouteChange('signIn')}
				>
					Sign In
				</p>
				<p
					className='f3 dim link black underline pa3 pointer'
					onClick={() => onRouteChange('register')}
				>
					Register
				</p>
			</nav>
		);
	}
};

export default Navigation;

//! In the nav style, the justify-content of CSS becomes justifyContent in React inline styling, because - cannot be used in object properties
