import React from 'react';

const Navigation = ({ onRouteChange}) =>{

/*	if(onRouteChange === 'home'){

		return(
			<nav style={{display: 'flex', justifyContent : 'flex-end', paddingRight:'20px'}}>
			<p
			onClick={() => onRouteChange('signin')}
			className ='f3 link black underline pa3 link white pointer shadow-1 br-pill link b black pv2 db bg-animate hover-bg-dark-gray'>
				Sign out
			</p>
		</nav>
		)
	}

*/


	return (



		<nav style={{display: 'flex', justifyContent : 'flex-end', paddingRight:'20px'}}>
			<p
			onClick={() => onRouteChange('signin')}
			className ='f3 link black underline pa3 link white pointer shadow-1 br-pill link b black pv2 db bg-animate hover-bg-dark-gray'>
				Sign out
			</p>
		</nav>




		);


}

export default Navigation; 