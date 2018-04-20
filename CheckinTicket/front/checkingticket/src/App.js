import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

class SigningIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        alert( this.state.value + ' is connected');
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="email"
                    id="email"
                    value={this.state.login}
                    placeholder="Email"
                    onChange={this.handleChange} />
                <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.handleChange} />
                <input type="submit" id="submit" value="Sign in" />
            </form>
        )
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            endpoint: 'http://localhost:4001'
        }
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on('login');
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                  <h1 className="App-title">Signing in</h1>
                </header>
                <SigningIn/>
                <p className="App-intro">
                </p>
            </div>
        );
    }
}

export default App;
