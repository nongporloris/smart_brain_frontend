import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{

	return(

		<div>
			<p className='f3 link dim light-gray'>
				{'This Magic Brian will detect face your picture.'}
			</p>


			<div>
				<div className ='form pa4 br3 shadow-5 center' style ={{display:'flex' , justifyContent:'center' , width:'600px'}}>
					<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'
						
						onClick={onButtonSubmit}
						>Detect!!!</button>

				</div>	
			</div>

		</div>

		);




}

export default ImageLinkForm;