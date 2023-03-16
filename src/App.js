import './App.css';
import React from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from './components/Particles';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const initialState = {
      input:'',
      imageURL: '',
      box: {},
      route: 'signin',


///////Update user profile who use the web now////////
      user :{

        id:'',
        name:'',
        email:'',
        entries:0,
        joined:'',

      }
}

class App extends React.Component{

  constructor(){
    super();

    this.state = initialState;

     

    

  }

loadUser = (user)=>{
  this.setState({

    user :{

      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,

    }
  });

}
  
    
calculateFaceLocation =(data) =>{

   //const clarifaiFace = data.regions[0].data.concepts.regions[0].region_info.bounding_box;
   //const clarifaiFace = data.presets.data.outputs[0].data.regions[0].data.concepts.regions[0].region_info.bounding_box;
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);

   return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),

   }

}

displayFaceBox = (box)=> {

  console.log(box);
  this.setState({box:box});
}

onInputChange = (event) =>{

 // console.log(event.target.value);
  this.setState({input: event.target.value});

}



onButtonSubmit = ()=>{

 this.setState({imageURL: this.state.input});


  const USER_ID = 'nongporloris';
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '40e71eb0255b4e1b8d27baf7d27ca0ec';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = this.state.input;



//////////////////////////////////////////////////////////////////////////////////////



     const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        //.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .then(response => response.json()) //text())
        .then(result => {
          //console.log(result)
          if(result){
            fetch('https://pcn-smart-brain-backend.onrender.com/image',{

                method : 'put',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                  id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count=> {
              this.setState(Object.assign(this.state.user, {entries : count}))
            })
          }

          return this.displayFaceBox(this.calculateFaceLocation(result));
        })
      //  .then(result => this.calculateFaceLocation(result))
        //.then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
        .catch(error => console.log('error', error));




/*
app.models
      .predict(
        {
          id: 'face-detection',
          name: 'face',
          version: '6dc7e46bc9124c5c8824be4822abe105',
          type: 'visual-detector',
        }, this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  

*/


} //this.onButtonSubmit



//If we have parameter like this
//In the return in other components like onClick({ ()=> onRouteChange('route') })
//**********************************************************************************
onRouteChange =(route) =>{
  
if( route === 'signin'){
    this.setState(initialState);
  }
  else{
    this.setState({route: route})
  }

}


  render(){


    return(

      <div className="App">

      {

        this.state.route === 'home' 
        
          ? <div>

              <Navigation onRouteChange={this.onRouteChange}/>

              <Logo/>

              <Rank name={this.state.user.name} entries={this.state.user.entries} />

              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit= {this.onButtonSubmit}/>

              <FaceRecognition box={this.state.box} imageURL = {this.state.imageURL}/>
            </div>


          //<Signin onRouteChange={this.onRouteChange}/>

          : (this.state.route === 'signin'

              ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
      }
       
      

        <Particles className='parti' style={{zIndex:'-1'}}/>
       

      </div>




      );

  }


}

export default App;