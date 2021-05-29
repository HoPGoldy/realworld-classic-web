import { Link } from 'react-router-dom';
import api from '~/api';
import './styles.css';

const Home = function () {
    return (
        <div>
            <header className="header-area">
                <b>conduit</b>
                <div>
                    <Link to="/">Home</Link>
                    <Link to="/login">Sign in</Link>
                    <Link to="/register">Sign up</Link>
                </div>
            </header>
            <div className="big-title">
                <p>Conduit</p>
                <div className="introduction">A place to share your knowledge.</div>
            </div>

            <b>Popular Tags: </b>
            <Link to="">test</Link>
            <Link to="">test</Link>
            <Link to="">test</Link>
            <Link to="">test</Link>
            <Link to="">test</Link>
        </div>
    );
}

export default Home;