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
      current_index: 4
    };
  }

  componentDidMount() {

  }

  getUserInput = (e) => {
    e.preventDefault();
    this.setState({
      location: e.target.location.value,
      category: e.target.category.value
    });

    fetch(`http://localhost:5000/api/search/${e.target.location.value}/${e.target.category.value}`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        location: e.target.location.value,
        category: e.target.category.value
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ response: data})
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EatUp</h1>
        </header>
        <Form getUserInput = {this.getUserInput}/>
        {this.state.response.map((res, i) => (
            <div style={{display: i === this.state.current_index ? 'block' : 'none'}}>
              <h5>{res.name}</h5>
              <h5>{res.address}</h5>
              <h6>{res.phone}</h6>
              <img src={res.image} alt={res.name}/>
            </div>
          ))}
      </div>
    );
  }
}

export default App;

//Each child in an array or iterator should have a unique "key" prop.
