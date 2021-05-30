import './App.css';
import { Home, Login } from './pages';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Redirect from="/" to="/home/globalFeed" />
      </Switch>
    </div>
  );
}

export default App;
