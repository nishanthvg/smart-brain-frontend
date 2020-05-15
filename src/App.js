import React, { Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import './App.css';
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'



const particlesOption = {
  particles: {
    line_linked: {
      number :{
        value: 100000000000000000,
        density: {
          enable:true ,
          value_area:1000000000000000
        }
      }
    }
  }
}

let intialState = {
  input : '',
  imageurl: '',
  box:{},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0, // rank
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = intialState
    }
  

  loadUser = (user) => {
    this.setState( { 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries, // rank
        joined: user.joined
      }
    }

    )
  }


  calculateFaceLocation = (data) => {
    const calarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: calarifyFace.left_col * width,
      topRow: calarifyFace.top_row * height,
      rightCol: width - (calarifyFace.right_col * width),
      bottomRow: height - (calarifyFace.bottom_row * height)
    }
  }
  displayFacebox = (box) => {
    this.setState({box: box});
  }

  OnInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  OnButtonSubmit = () => {
    this.setState({imageurl: this.state.input})
      fetch("http://localhost:3004/image" , {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch("http://localhost:3004/image" , {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries: count}))
          })
          .catch(console.log)
        }
        this.displayFacebox(this.calculateFaceLocation(response))
      }) 
      .catch(error => console.log(error));   
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(intialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, route, box, imageurl} = this.state;
     return (
      <div className="App">
        <Particles className = 'particles'
          params={particlesOption}
        />
        <Navigation  onRouteChange = {this.onRouteChange} isSignedIn = {isSignedIn} />
        { route === 'home' 
          ? <div>
              <Logo/>
              <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
              <ImageLinkForm  OnInputChange = {this.OnInputChange} OnButtonSubmit = {this.OnButtonSubmit}/>
              <FaceRecognition box = {box} imageurl = {imageurl}/>
            </div>
          : <div>
              {
              route === 'signin' 
              ? <SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
              }
            </div>
        }
      </div>
    );
  }
}

export default App;
