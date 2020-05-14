import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import './login.css'
import Axios from 'axios';

function Console({resourceName, errorMsg, setErrorMsg, exit}) {
    const [input, setInput] = useState('')
   
    function handleInputChange(e) {
        setInput(e.target.value)
        setErrorMsg('')
    }

    function handleSubmit(e) {
        e.preventDefault()
        Axios.post(`http://${resourceName}/CheckPasssword`, JSON.stringify(input))
    }

    return (
        <div className="container">
            <span id="close" role="img" aria-label="Close Button" onClick={exit}>&#10060;</span>
            <h1>Ingame Console</h1>
            <form onSubmit={handleSubmit}>
                <input type="password" placeholder="Enter rcon password..." value={input} onChange={handleInputChange} autoFocus/>
                <div style={{color: 'red', display: 'inline-block', fontWeight: '500', marginBottom: '20px'}}>{errorMsg}</div>
                <div>
                    <button type="button" onClick={exit}>Close</button>
                    <button type="submit">Login</button>
                </div>
            </form>
            <p style={{marginTop: '45px', fontSize: '18px'}}>Made by <FontAwesomeIcon icon={faDiscord} /> gegen#4674</p>
        </div>
    )
}

export default Console;