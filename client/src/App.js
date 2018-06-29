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
      category: ''
    };
  }

  componentDidMount() {

  }

  getUserInput = (e) => {
    e.preventDefault();
    console.log('hello')
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
        {this.state.response.map(res => (
          <div>
            <h5>{res.name}</h5>
            <img src={res.image} alt={res.name}/>
          </div>
          ))}
      </div>
    );
  }
}


export default App;
