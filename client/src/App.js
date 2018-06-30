import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/form.jsx'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: [],
      location: '',
      category: '',
      current_card: 0
    };
  }

  componentDidMount() {

  }

  getUserInput = (e) => {
    e.preventDefault();
    this.setState({
      location: e.target.location.value,
      category: e.target.category.value,
      radius: e.target.radius.value
    });

    fetch(`http://localhost:5000/api/search/${e.target.location.value}/${e.target.category.value}/${e.target.radius.value}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        location: e.target.location.value,
        category: e.target.category.value,
        radius: e.target.radius.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ response: data})
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  increment = (e) => {
   e.preventDefault()
   this.setState({
     current_card: this.state.current_card + 1
   });
  }

  decrease = (e) => {
   e.preventDefault()
   this.setState({
     current_card: this.state.current_card - 1
   });
  }

  geoFindMe = () => {
    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

      var img = new Image();
      img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

      output.appendChild(img);
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
        <div>
          {this.state.current_card > 0 &&
             <button onClick={this.decrease}>
              Previous option
              </button>
          }
          {this.state.current_card < 19 &&
             <button onClick={this.increment}>
               Next Option
             </button>
          }
       </div>

       <p><button onClick={this.geoFindMe}>Show my location</button></p>
        <div id="out"></div>

        {this.state.response.map((res, i) => (
            <div style={{display: i === this.state.current_card ? 'block' : 'none'}}>
              <h5>{res.name}</h5>
              <h5>{res.address}</h5>
              <h5>Phone: {res.phone}</h5>
              <h5>Price: {res.money}</h5>
              <h5>Rating: {res.rating}</h5>
              <img src={res.image} alt={res.name}/>
            </div>
          ))}
      </div>
    );
  }
}

export default App;

//Each child in an array or iterator should have a unique "key" prop.
