import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function SigningIn() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        if (name === "login") {
            setLogin(value);
        }
        if (name === "password") {
            setPassword(value)
        }
    }

    const handleSubmit = (e) => {
        alert(login + ' is connected');
        e.preventDefault();
    }

    return (
        <form onSubmit={ handleSubmit }>
            <input
                type="email"
                id="email"
                value={ login }
                placeholder="Email"
                onChange={ handleChange } />
            <input
                type="password"
                id="password"
                value={ password }
                placeholder="Password"
                onChange={ handleChange } />
            <input type="submit" id="submit" value="Sign in" />
        </form>
    )
}

function App() {
    const endpoint = 'http://localhost:4001';
    const socket = io(endpoint);

    useEffect(() => {
        socket.on('login', () => {
            console.log('login')
        });
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Signing in</h1>
            </header>
            <SigningIn />
            <p className="App-intro">
            </p>
        </div>
    );
}

export default App;
