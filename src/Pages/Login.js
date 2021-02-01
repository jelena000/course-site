import axios from "axios";
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    let { username, password } = this.state;

    let userObj  = { username : username, pass : password, 'valid' : '10d'};

    axios.post('/api/login', userObj)
    .then(response => {
        console.log('server data', response.data)
        let server_data = response.data;

        if(!server_data.idToken){
            console.log('greska');
            alert(server_data.msg);
        }else {
            //uspjesna prijava imamo token
            localStorage.setItem('LICKOV_TOKEN', server_data.idToken);
            
            this.props.history.push("/");
            console.log(server_data.idToken);
        }

    }
    ,error => {
        this.setState({ loading: false, badLogin : true, badLoginMsg : 'Došlo je do greške prilikom prijavljivanja'});
    });
  }

  render() {
    return (
      <div className="container" style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <div className="card" style={{width: 400,  padding: 20}}>
          <div className="form-group" >
            <label htmlFor="exampleInputEmail1" style={{fontWeight: 'bold',  paddingLeft: 10}}>Korisnicko ime</label>
            <input
              className="form-control login-input"
              name="username"
              type="text"
              placeholder="Korisnicko ime"
              onChange={(e) =>
                this.setState({ username: e.currentTarget.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" style={{fontWeight: 'bold', paddingLeft: 10}}>Sifra</label>
            <input
              className="form-control"
              name="password"
              type="text"
              placeholder="Sifra"
              onChange={(e) =>
                this.setState({ password: e.currentTarget.value })
              }
            />
          </div>
          <div style={{ paddingTop: 10, display: 'flex', justifyContent: 'center'}}>
            <button type="button" class="btn btn-primary" onClick={this.onSubmit}>Prijavi se</button>
          </div>
          <div className="" style={{ paddingTop: 25, display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center'}}>
              <div style={{paddingBottom: 10}}>
                <span>Nemate nalog?</span> 
                <a href="">Registracija</a>
              </div>
              <div>
                <span>Zaboravili ste šifru?</span> 
                <a href="">Pošalji na e-mail adresu</a>
              </div>
             
          </div>
        </div>
        
      </div>
    );
  }
}
