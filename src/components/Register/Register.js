import React from 'react';

class Register extends React.Component{

//Send props form the App component
//Remember to use this.props
//*** Especially when props are used in the return function ******//

	constructor(props){
		super(props)
		this.state = {

			regisEmail: '',
			regisPassword: '',
			regisName: '',
		}
	}

//Remember the "event" when input thing is change like onChange() in the input reciever
	onNameChange = (event) =>{
		this.setState({regisName: event.target.value})
	}

	onEmailChange = (event) =>{
		this.setState({regisEmail: event.target.value})
	}

	onPasswordChange = (event) =>{
		this.setState({regisPassword: event.target.value})
	}

	onSubmitRegister =() =>{

		// console.log(this.state);
		fetch('http://localhost:3001/register', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				email: this.state.regisEmail,
				password: this.state.regisPassword,
				name: this.state.regisName,
			})
		})
		.then(response => response.json())
		.then(user =>{

			if(user === 'requirement error'){

				alert('Please input all requirements');
			}
			else if(user === 'Unable to register'){
				//this.props.onRouteChange('register');
				alert('Email has been used');
			}
			else if(user){
				//console.log();
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}

		})



		  // this.props.onRouteChange('home');
	}


	render(){

//*** Remember this***//
//If the component is extends class
//we need to deconstructure the props like this below

		const {loadUser,onRouteChange} = this.props

		return(

			<div style={{height:'100vh',display:'flex', alignItems:'center'}}>
			<article style={{padding:'30px'}} className="mw6 center bg-white br3 pa3 pa1-ns mv3 ba b--black-10 ">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				     {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}  
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" 
				      	onClick={this.onSubmitRegister}/>
				    </div>

				    <div className = "lh-copy mt3">
				    	<a href="#0" onClick={()=>onRouteChange('signin')} className="f6 link dim black db pointer">Back</a>
				    </div>
				    {/*<div className='1h-copy mt3'>
				    	<p onClick={ () => onRouteChange('register')} className='f6 link dim black db' >Register</p>
				    </div>
					*/}
					

				   {/* <div className="lh-copy mt3">
				      <a href="#0" className="f6 link dim black db">Sign up</a>
				      <a href="#0" className="f6 link dim black db">Forgot your password?</a>
				    </div>*/}


				  </div>
				</main>
			</article>
			</div>

		);
	}
	

}

export default Register;