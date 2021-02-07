import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Provider} from 'react-redux';
import { store } from './Redux/store';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
