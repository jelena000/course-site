import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loggInUser, logout } from "../Redux/_actions/actions";

const initialState = {
  username: "",
  password: "",
  email: "",
  firstname: "",
  log: true,
  passForg: false,
  uNameErr: "",
  fNameErr: "",
  passErr: "",
  emailErr: "",
  noteErr: "",
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("validacija je: ");
    console.log(this.validate());
    if (this.validate()) {
      const { dispatch } = this.props;

      let { username, password } = this.state;

      //clear form PROVJERITI
      this.setState({ initialState });

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
            localStorage.setItem("MOJ_TOKEN", server_data.idToken);

            if (server_data.isAdmin1) {
              //admin tip
              this.props.loggInUser(username, 2);
            } else {
              //obican korisnik
              this.props.loggInUser(username, 1);
            }

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
    }
  };
  validate = () => {
    let { firstname, username, password, email } = this.state;
    let fNameErr,
      uNameErr,
      passErr,
      noteErr,
      emailErr = "";
    if (!firstname.includes(" ")) fNameErr = "red";
    if (username.length <= 4) uNameErr = "red";
    if (password.length < 8) passErr = "red";
    if (!email.includes("@")) emailErr = "red";

    if (fNameErr || uNameErr || passErr || emailErr) {
      this.setState({
        fNameErr,
        uNameErr,
        passErr,
        emailErr,
        noteErr: "Pogresan unos. Pokusajte ponovo.",
      });
      return false;
    } else {
      let fNameErr,
        uNameErr,
        passErr,
        noteErr,
        emailErr = "";
      this.setState({ fNameErr, uNameErr, passErr, emailErr, noteErr });
      return true;
    }
  };
  genereateForm() {
    if (this.state.log && !this.state.passForg) {
      return (
        <div>
          <div style={{ paddingBottom: 50, paddingTop: 122 }}>
            <h2>Prijava</h2>
          </div>
          <div>{this.generateLogin()}</div>
        </div>
      );
    } else if (!this.state.log && !this.state.passForg) {
      return (
        <div>
          <div style={{ paddingBottom: 50, paddingTop: 122 }}>
            <h2>Registracija</h2>
          </div>
          <div>{this.generateRegister()}</div>
        </div>
      );
    } else if (this.state.passForg && !this.state.log) {
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
        <form>
          <div className="form-group">
            <span style={{ color: "red", border: "1 px solid red" }}>
              {this.state.noteErr}
            </span>
            <div className="cpy-input-container fav-user">
              <input
                className="form-control cpy-input"
                name="firstname"
                type="text"
                placeholder="Ime i prezime*"
                style={{ borderColor: this.state.fNameErr }}
                onChange={(e) =>
                  this.setState({ firstname: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="cpy-input-container fav-user">
              <input
                className="form-control cpy-input"
                name="username"
                type="text"
                placeholder="Korisnicko ime*"
                style={{ borderColor: this.state.uNameErr }}
                onChange={(e) =>
                  this.setState({ username: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="cpy-input-container fav-pass">
              <input
                style={{ borderColor: this.state.passErr }}
                className="form-control cpy-input"
                name="password"
                type="password"
                placeholder="Lozinka*"
                onChange={(e) =>
                  this.setState({ password: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <div className="cpy-input-container fav-mail">
              <input
                className="form-control cpy-input"
                name="email"
                type="text"
                placeholder="E-mail*"
                style={{ borderColor: this.state.emailErr }}
                onChange={(e) =>
                  this.setState({ email: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div
            style={{
              paddingTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              className="btn btn-form"
              onClick={this.onSubmit}
            >
              <span className="btn-txt"> Registruj se</span>
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
                  this.setState({ log: true, passForg: false, fNameErr:"", uNameErr:"", passErr:"", emailErr:"", noteErr:"" });
                }}
              >
                <span className="link-txt">Prijava</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  generateLogin() {
    return (
      <div className="" style={{ width: 400, padding: 20 }}>
        <form>
          <div className="form-group">
            <label
              htmlFor="exampleInputEmail1"
              style={{ fontWeight: "bold", paddingLeft: 10 }}
            >
              Korisnicko ime
            </label>
            <div className="cpy-input-container fav-user">
              <input
                className="form-control cpy-input"
                name="username"
                type="text"
                placeholder="Korisnicko ime"
                onChange={(e) =>
                  this.setState({ username: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div className="form-group ">
            <label
              htmlFor="exampleInputPassword1"
              style={{ fontWeight: "bold", paddingLeft: 10 }}
            >
              Lozinka
            </label>
            <div className="cpy-input-container fav-pass">
              <input
                className="form-control cpy-input"
                name="password"
                type="text"
                placeholder="Lozinka"
                onChange={(e) =>
                  this.setState({ password: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div
            style={{
              paddingTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              className="btn btn-form"
              onClick={this.onSubmit}
            >
              <span className="btn-txt"> Prijavi se</span>
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
                  this.setState({ log: false, passForg: false });
                }}
                className="link-txt"
              >
                Registracija
              </a>
            </div>
            <div>
              <span>Zaboravili ste lozinku?</span>
              <a
                href="#"
                onClick={(e) => this.setState({ passForg: true, log: false })}
                className="link-txt"
              >
                Pošalji na e-mail adresu
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  generateEmail() {
    return (
      <div className="" style={{ width: 400, padding: 20 }}>
        <form>
          <div className="form-group">
            <div className="cpy-input-container fav-mail">
              <input
                className="form-control cpy-input"
                name="text"
                type="text"
                placeholder="E-mail"
                onChange={(e) =>
                  this.setState({ password: e.currentTarget.value })
                }
              />
            </div>
          </div>
          <div
            style={{
              paddingTop: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button type="button" className="btn btn-form">
              <span className="btn-txt">Posalji</span>
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
                  this.setState({ log: true, passForg: false });
                }}
              >
                <span className="link-txt">Prijava</span>
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    console.log(this.props.loggedIn, "--------------------", this.props.user);

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
          className="side-image"
          style={{
            flex: 1,
            textAlign: "center",
            height: "100%",
            backgroundRepeat: "round",
            backgroundSize: "cover",
            backgroundColor: "gray",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1536880411027-5ffdd818d3d0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBlb3BsZSUyMGJpa2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60")',
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
        className="side-image"
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

function mapStateToProps(state) {
  const { loggedIn, user } = state.authentication;
  return {
    loggedIn,
    user,
  };
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loggInUser,
      logout,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Login);
