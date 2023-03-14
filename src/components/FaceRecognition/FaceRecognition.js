import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imageURL, box }) => {

	return(

		<div style={{display: 'flex', justifyContent:'center', padding:'20px'}}>

			<div className ='absolute mt2'>
				<img id='inputimage' className='br4' alt='' src={imageURL} width='500px' height='auto' />
	
				<div className = 'boundering-box' style={{
					top: box.topRow,
					right: box.rightCol,
					bottom: box.bottomRow,
					left: box.leftCol}}>
				
				</div>

			</div>


		</div>

	);

}

export default FaceRecognition;

/*

https://media.istockphoto.com/id/805012064/photo/portrait-of-mature-hispanic-man.jpg?s=612x612&w=0&k=20&c=AfNa1ay8LPzaO-NOJZspqULvYavyhXg4rnJ9U_tvJY4=


*/