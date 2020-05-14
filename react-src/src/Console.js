import React, { useEffect, useState } from 'react';
import './console.css'
import Axios from 'axios';

function Console({ resourceName, consoleBufferWithCommands, setConsoleBufferWithCommands, exit }) {
    const [input, setInput] = useState('')

    const buffer = '<span>' + consoleBufferWithCommands.replace(/\^([0-9])/g, ([, color]) => `</span><span class="color-${color}">`) + '</span>'

    useEffect(() => {
        const console = document.getElementsByClassName('console')[0]
        console.scrollTop = console.scrollHeight
    }, [consoleBufferWithCommands])

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if ( input === 'restart ' + resourceName || input === 'stop ' + resourceName ) {
            setConsoleBufferWithCommands(prevState => prevState + colorizeInput(input) + `\n^1SCRIPT ERROR: @${resourceName} cannot restart/stop itself.^7\n`)
            setInput('')
            return
        }
        Axios.post(`http://${resourceName}/ExecuteConsoleCommand`, JSON.stringify(input))
        const newLine = colorizeInput(input) + '\n'
        setConsoleBufferWithCommands(prevState => prevState + newLine)
        setInput('')
    }

    function colorizeInput(input) {
        return input.replace(/(^[^ ]+)/, '^6$1^7')
    }

    return (
        <div className="wrapper">
            <div className="TopBar">
                Console
                <span id="cclose" role="img" aria-label="Close Button" onClick={exit}>&#10060;</span>
            </div>
            <div className="console" dangerouslySetInnerHTML={{__html: buffer}}/>
            <form onSubmit={handleSubmit}>
                <input className="consoleInput" placeholder="Enter command..." value={input} onChange={handleInputChange} autoFocus/>
            </form>
        </div>
    )
}

export default Console;