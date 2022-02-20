import './App.css';
import AuthProvider from './Pages/Context/AuthProvider/AuthProvider';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Navigation from './Pages/Navigation/Navigation';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navigation></Navigation>
          <Switch>
          {/*
            <Route exact path="/">
              <HomeMain></HomeMain>
            </Route>
            <Route path="/home">
              <HomeMain></HomeMain>
            </Route>
            <Route path="/aboutus">
              <Aboutus></Aboutus>
            </Route>
          */}
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
          </Switch> 
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
