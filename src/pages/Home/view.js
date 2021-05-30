import { Link, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlobalFeed from './components/GlobalFeed/views'
import api from '@/api';
import './styles.css';

const renderTag = function (tag) {
    const to = {
        pathname: '/home/globalFeed',
        search: `?tag=${tag}`
    }
    return (
        <>
            <Link key={tag} to={to}>{tag}</Link>
            &nbsp;&nbsp;
        </>
    )
}

const Home = function () {
    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        const resp = await api.get('/tags');
        if (!resp.data) return;
        setTags(resp.data.tags);
    }

    useEffect(() => { fetchTags() }, []);

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
            <div className="big-title">
                <h1>Conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>

            <nav>
                <br />
                <b>Popular Tags: </b>
                {tags.map(renderTag)}

                <br /><br />
                <b>Views: </b>
                <Link to="/home/globalFeed">global feed</Link>
            </nav>
            
            <section>  
                <Switch>
                    <Route path="/home/globalFeed" component={GlobalFeed} />
                </Switch>
            </section>
        </div>
    );
}

export default Home;