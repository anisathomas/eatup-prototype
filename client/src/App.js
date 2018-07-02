import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/form.jsx'
import Swipes from './components/swipes.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      category: '',
      radius: 0,
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {

  }

  getUserInput = (e) => {
    e.preventDefault();
    this.setState({
      category: e.target.category.value,
      radius: e.target.radius.value
    });

    fetch(`http://localhost:5000/api/search/${e.target.category.value}/${e.target.radius.value}/${this.state.latitude}/${this.state.longitude}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        category: e.target.category.value,
        radius: e.target.radius.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({data})
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  geoFindMe = () => {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    var success = (position) => {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      this.setState({latitude: latitude, longitude: longitude});

      output.innerHTML = '<p>Your Latitude is ' + latitude + '° <br>Your Longitude is ' + longitude + '°</p>';
    }


    function error() {
      output.innerHTML = "Unable to retrieve your location";
    }

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EatUp</h1>
        </header>
        <Form getUserInput = {this.getUserInput}/>
        <p><button onClick={this.geoFindMe}>Use my location</button></p>
        <div id="out"></div>
        <Swipes data={this.state.data}/>
      </div>
    );
  }
}

export default App;

//Changes/needs to be done:
//need to do km params & reset category to lowercase
//changed response to data, took out increment & deincrement func & buttons. Added swipe functionality to restaurants
//Each child in an array or iterator should have a unique "key" prop.
