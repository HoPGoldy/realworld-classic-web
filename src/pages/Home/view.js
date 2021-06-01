import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ArticleList from '@/components/ArticleList';
import api from '@/api';
import '@/common.css';
import renderTag from '@/components/renderTag';
import PageTitle from '@/components/PageTitle';
import useLocation from '@/components/useLocation';

const Home = function () {
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const { tag, page = 0 } = location.query;

    const fetchTags = async () => {
        const resp = await api.get('/tags');
        if (!resp.data) return;
        setTags(resp.data.tags);
    }

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <PageTitle title="Conduit" summary="A place to share your knowledge."/>

            <nav>
                <br />
                <div className="flex-wrap">
                    <b>Popular Tags: </b>{tags.map(renderTag)}
                </div>

                <br />
                <b>Views: </b>
                <Link to="/home">global feed</Link>&nbsp;&nbsp;
                {tag && <Link to={`/home?tag=${tag}`}>#{tag}</Link>}
            </nav>

            <ArticleList tag={tag} page={page}/>
        </div>
    );
}

export default Home;