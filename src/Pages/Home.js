import React, { Component } from 'react'

export default class Home extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let token = localStorage.getItem('LICKOV_TOKEN'); 

        if(!token){
            this.props.history.push("/login");
        }
        console.log('token iz Homa ', token);
    }

    render() {
        return (
            <div>
                Home
            </div>
        )
    }
}
