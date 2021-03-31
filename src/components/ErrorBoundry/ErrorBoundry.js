import React from 'react'

class ErrorBoundry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error : undefined,
            hasError : false,
            errorInfo : undefined
        }
    }
    componentDidCatch(error, errorInfo){
        this.setState({
            hasError : true,
            error,
            errorInfo
        })
    }

    render(){
        if(this.state.hasError){
            return <div className="alert alert-danger">Opps, something went wrong.</div>
        }
        return this.props.children
    }
}

export default ErrorBoundry