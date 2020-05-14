import React, { useState, useCallback, useEffect } from 'react';
import Axios from 'axios';
import './main.css';
import Console from './Console'
import Login from './Login'

const curVersion = "1.0"

const Menu = () => {
    const [displayMenu, setDisplayMenu] = useState(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? false : false) // Change to false in production
    const [resourceName, setResourceName] = useState('console')
    const [consoleBufferWithCommands, setConsoleBufferWithCommands] = useState('')
    const [consoleBuffer, setConsoleBuffer] = useState('')
    const [isAuthed, setIsAuthed] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const handleMessage = useCallback((event) => {
        if (!event.detail) return
        const item = event.detail.data //IMPORTANT REMOVE DETAIL FOR BUILD!
        //var item = event.data;
        if (item.type === "ui") {
            if (item.status === true) {
                setDisplayMenu(true);
            } else {
                setDisplayMenu(false);
            }
        } else if (item.type === "ResourceName") {
            setResourceName(item.value || 'console')
        } else if (item.type === "SetAuth") {
            setIsAuthed(item.auth || false)
            if (item.auth === false) {
                setConsoleBufferWithCommands('')
                setConsoleBuffer('')
            }
        } else if (item.type === "ErrorMsg") {
            setErrorMsg(item.error || '')
        } else if (item.type === "ConsoleBuffer") {
            if (item.data) {
                const data = JSON.parse(item.data);
                if (data !== consoleBuffer) {
                    setConsoleBufferWithCommands(prevState => prevState + data.replace(consoleBuffer, ''))
                    setConsoleBuffer(data)
                }
            }
        }
    }, [consoleBuffer])
    
    useEffect(() => {
        if (isAuthed) {
            Axios.get('https://raw.githubusercontent.com/gegen/IngameConsole/version.json')
            .then((response) => {
                const data = JSON.parse(response.data)
                if (data.version > curVersion) {
                    setTimeout(()=>
                        setConsoleBufferWithCommands(prevState => prevState + `\n^3----- ^1New Update:^3 -----------------------------------------\n\nFiveM Ingame Console has a new version (${data.version}).\nVersion ${curVersion} is installed.\nInstall at: ^0https://github.com/gegen/IngameConsole^3\n\n-----------------------------------------------------------\n\n`)
                        , 2000
                    )
                }
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }, [isAuthed])

    useEffect(() => {
        window.addEventListener('message', handleMessage)
        return () => window.removeEventListener('message', handleMessage)
    }, [handleMessage])

    document.onkeyup = function (event) {
        if (event.which === 27) { // ESC/m (close menu)
            exitMenu();
        }
    }

    const exitMenu = () => Axios.post(`http://${resourceName}/exit`, JSON.stringify(''));

    return (
        displayMenu &&
            <>
                {
                    isAuthed ?
                        <Console 
                            resourceName={resourceName}
                            consoleBufferWithCommands={consoleBufferWithCommands}
                            setConsoleBufferWithCommands={setConsoleBufferWithCommands}
                            exit={exitMenu}
                        />
                    :
                        <Login 
                            resourceName={resourceName}
                            errorMsg={errorMsg}
                            setErrorMsg={setErrorMsg}
                            exit={exitMenu}
                        />
                }
            </>
    )
}

export default Menu;