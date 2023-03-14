import React from 'react';
import ReactDOM from 'react-dom';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import Brain from './brain.png';

const Logo = () =>{

	return (

		<div style={{display: 'flex', justifyContent: 'flex-start'}} className ='pl5'>

			<Tilt className ='br2 shadow-3'>

		      <div className ='pb1' style={{ height: '150px', width:'150px' }} option={{max : 100}}>
		        <h1 className="Tilt-inner"><img alt='logo' src={Brain} width={130} height={130}/></h1>
		      </div>

		    </Tilt>

		</div>




		);

}

export default Logo; 