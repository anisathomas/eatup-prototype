import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/search');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
