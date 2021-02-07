import axios from "axios";
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      log: true,
      pass: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    let { username, password } = this.state;

    let userObj = { username: username, pass: password, valid: "10d" };

    axios.post("/api/login", userObj).then(
      (response) => {
        console.log("server data", response.data);
        let server_data = response.data;

        if (!server_data.idToken) {
          console.log("greska");
          alert(server_data.msg);
        } else {
          //uspjesna prijava imamo token
          localStorage.setItem("LICKOV_TOKEN", server_data.idToken);

          this.props.history.push("/");
          console.log(server_data.idToken);
        }
      },
      (error) => {
        this.setState({
          loading: false,
          badLogin: true,
          badLoginMsg: "Došlo je do greške prilikom prijavljivanja",
        });
      }
    );
  };

  genereateForm() {
    if (this.state.log && !this.state.pass) {
      return (
        <div>
          <div style={{ paddingBottom: 50, paddingTop: 122 }}>
            <h2>
              {this.state.log ? "Prijavite se" : "Registruj se"}
              {this.state.pass ? "nmnmnm" : ""}
            </h2>
          </div>
          <div>{this.generateLogin()}</div>
        </div>
      );
    } else if (!this.state.log && !this.state.pass) {
      return (
        <div>
          <div style={{ paddingBottom: 50, paddingTop: 122 }}>
            <h2>Registracija</h2>
          </div>
          <div>{this.generateRegister()}</div>;
        </div>
      );
    } else if (this.state.pass && !this.state.log) {
      return (
        <div>
          <div style={{ paddingBottom: 50, paddingTop: 122 }}></div>
          <div>{this.generateEmail()}</div>
        </div>
      );
    }
  }

  generateRegister() {
    return (
      <div className="" style={{ width: 400, padding: 20 }}>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="name"
            type="text"
            placeholder="Ime*"
            onChange={(e) => this.setState({ name: e.currentTarget.value })}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="lastname"
            type="text"
            placeholder="Prezime*"
            onChange={(e) => this.setState({ lastname: e.currentTarget.value })}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="username"
            type="text"
            placeholder="Korisnicko ime*"
            onChange={(e) => this.setState({ username: e.currentTarget.value })}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="password"
            type="text"
            placeholder="Lozinka*"
            onChange={(e) => {
              console.log("blaa");
              this.setState({ password: e.currentTarget.value });
            }}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="password"
            type="text"
            placeholder="Potvrda lozinke*"
            onChange={(e) => {
              console.log("blaa");
              this.setState({ password: e.currentTarget.value });
            }}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control login-input"
            name="email"
            type="text"
            placeholder="E-mail*"
            onChange={(e) => this.setState({ email: e.currentTarget.value })}
          />
        </div>
        <div
          style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.onSubmit}
          >
            Registruj se
          </button>
        </div>
        <div
          className=""
          style={{
            paddingTop: 25,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div style={{ paddingBottom: 10 }}>
            <span>Imate nalog?</span>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                this.setState({ log: true, pass: false });
              }}
            >
              Prijava
            </a>
          </div>
        </div>
      </div>
    );
  }

  generateLogin() {
    return (
      <div className="" style={{ width: 400, padding: 20 }}>
        <div className="form-group">
          <label
            htmlFor="exampleInputEmail1"
            style={{ fontWeight: "bold", paddingLeft: 10 }}
          >
            Korisnicko ime
          </label>
          <input
            className="form-control login-input"
            name="username"
            type="text"
            placeholder="Korisnicko ime"
            onChange={(e) => this.setState({ username: e.currentTarget.value })}
          />
        </div>
        <div className="form-group ">
          <label
            htmlFor="exampleInputPassword1"
            style={{ fontWeight: "bold", paddingLeft: 10 }}
          >
            Lozinka
          </label>
          <input
            className="form-control login-input"
            name="password"
            type="text"
            placeholder="Lozinka"
            onChange={(e) => this.setState({ password: e.currentTarget.value })}
          />
        </div>
        <div
          style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}
        >
          <button
            type="button"
            className="btn btn-primary"
            style={{ borderRadius: 100 }}
            onClick={this.onSubmit}
          >
            Prijavi se
          </button>
        </div>
        <div
          className=""
          style={{
            paddingTop: 25,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div style={{ paddingBottom: 10 }}>
            <span>Nemate nalog?</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ log: false, pass: false });
              }}
            >
              Registracija
            </a>
          </div>
          <div>
            <span>Zaboravili ste lozinku?</span>
            <a
              href="#"
              onClick={(e) => this.setState({ pass: true, log: false })}
            >
              Pošalji na e-mail adresu
            </a>
          </div>
        </div>
      </div>
    );
  }

  generateEmail() {
    return (
      <div className="" style={{ width: 400, padding: 20 }}>
        <div className="form-group">
          <label
            htmlFor="exampleInputPassword1"
            style={{ fontWeight: "bold", paddingLeft: 10 }}
          >
            E-mail
          </label>
          <input
            className="form-control"
            name="text"
            type="text"
            placeholder="E-mail"
            onChange={(e) => this.setState({ password: e.currentTarget.value })}
          />
        </div>
        <div
          style={{ paddingTop: 10, display: "flex", justifyContent: "center" }}
        >
          <button type="button" className="btn btn-primary">
            Posalji
          </button>
        </div>
        <div
          className=""
          style={{
            paddingTop: 25,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <div style={{ paddingBottom: 10 }}>
            <span>Imate nalog?</span>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                this.setState({ log: true, pass: false });
              }}
            >
              Prijava
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            height: "100%",
            backgroundRepeat: "round",
            backgroundSize: "cover",
            backgroundColor: "gray",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1554230678-5213344dc151?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTN8fGJpa2UlMjByZW50fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
          }}
        ></div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1.5,
            textAlign: "center",
            borderLeft: "1px solid gray",
            borderRight: "1px solid gray",
            height: "100%",
          }}
        >
          {this.genereateForm()}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            height: "100%",
            backgroundSize: "cover",
            backgroundRepeat: "round",
            backgroundColor: "gray",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1536880411027-5ffdd818d3d0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGJpa2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          }}
        ></div>
      </div>
    );
  }
}
