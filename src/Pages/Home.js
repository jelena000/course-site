import axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loggInUser, logout} from '../Redux/_actions/actions'

class Home extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        let token = localStorage.getItem('MOJ_TOKEN'); 

        if(!token){
            this.props.history.push("/login");
        }
        console.log('token iz Homa ', token);
    }

    render() {
        return (
            <div>
                Home 2 {this.props.user + ' i tip : ' + this.props.userType}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggedIn, user, userType } = state.authentication;
    return {
        loggedIn, user, userType
    };
  }
  
  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      loggInUser, logout
    }, dispatch)
  );
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  
