import React from 'react';
import './ErrorBoundry.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { closed: false, error: null, errorInfo: null };
    }
  
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({
            error: error,
            errorInfo: errorInfo
          })
    }
  
    render() {
        if (this.state.errorInfo) {
            if (this.state.closed) {
                return null
            }
            return (
                <div className="Box">
                    <h1 style={{ marginBottom: "10px" }}>FiveM Ingame Console crashed :(</h1>
                    
                    <details style={{ textAlign: "left", whiteSpace: 'pre-wrap', marginBottom:"30px" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    
                    </details>
                    <button className="outlinebtn" onClick={()=>this.setState({closed: true})}>Close Console</button>
                    <button onClick={()=>window.location.reload()}>Restart Console</button>
                </div>
            )
        }
    
        return this.props.children; 
    }
}

export default ErrorBoundary;