import React from 'react';

class Signin extends React.Component{

	constructor(props){
		super(props)
		this.state = {

			signInEmail: '',
			signInPassword: '',
		}
	}

	onEmailChange = (event) =>{
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) =>{
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn =() =>{

		// console.log(this.state);
		fetch('https://pcn-smart-brain-backend.onrender.com:3001/signin', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())// This is not ruturn a json object but return a resolve of promise as a json input and 
		//parsing it to produce a js object
		.then(data =>{

			if(data.id){
				//console.log();
				this.props.loadUser(data);
				this.props.onRouteChange('home');
			}
			else{
				alert(data);
			}
		})

		  // this.props.onRouteChange('home');
	}


	render(){

		const {loadUser,onRouteChange} = this.props;

		return(

			<div style={{height:'100vh',display: 'flex',
	   			alignItems: 'center'
	    		}}>

			<article className="mw6 center bg-white br3 pa3 pa1-ns mv3 ba b--black-10" style={{padding:'30px'}} >
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input onChange = {this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
				      </div>
				     {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}  
				    </fieldset>
				    <div className="">
				      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" 
				      	onClick={this.onSubmitSignIn}/>
				    </div>
				    <div className="lh-copy mt3" style={{display:'flex', justifyContent:'center'}}>
				      <a onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Sign up</a>
				      {/*<a href="#0" className="f6 link dim black db">Forgot your password?</a>
				   		*/}
				    </div>
				  </div>
				</main>
			</article>

			</div>

		);

	}

	
}

export default Signin;