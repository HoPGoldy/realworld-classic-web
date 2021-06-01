import './App.css';
import { Home, Login, Article, User } from './pages';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { footer } from '@/components/Footer/view';

function App() {
  return (
    <div>
      <header className="header-area">
          <b><Link to="/">conduit</Link></b>
          <div>
              <Link to="/">Home</Link>&nbsp;|&nbsp;
              <Link to="/login">Sign in</Link>&nbsp;|&nbsp;
              <Link to="/register">Sign up</Link>
          </div>
      </header>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/article/:id" component={Article} />
        <Route path={['/user/:username/:tab', '/user/:username']} component={User} />
        <Redirect from="/" to="/home" />
      </Switch>

      {footer}
    </div>
  );
}

export default App;
