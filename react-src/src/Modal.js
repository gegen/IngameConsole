import React, { useEffect, useContext } from 'react';
import { DataContext } from './DataContext';

const Modal = ({title, display, onClose, children}) => {

    const [, setData] = useContext(DataContext)

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27 && display) onClose();
        };
        window.addEventListener('keyup', handleEsc);
        setData(prevState => ({...prevState, EnableESCKey: !display}))

        return () => {
            window.removeEventListener('keyup', handleEsc);
        };
    }, [onClose, display, setData]);

    if (!display) return null;

    return(
        <>
            <div className="Modal-bg" onClick={onClose}></div>
            <div className="Modal">
                <span className="ModalClose" onClick={onClose}>×</span>
                <div className="ModalTitle">{title}</div>
                {children}
            </div>
        </>
    )
}

export default Modal;