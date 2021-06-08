import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { ArticleList, Tag, PageTitle } from '@/components';
import api from '@/plugins/api';
import useLocation from '@/plugins/useLocation';
import { userContext } from '@/plugins/userContext';

const Home = function () {
    const [userInfo] = useContext(userContext);
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const { tag, page = 0, yourFeed } = location.query;

    const fetchTags = async () => {
        const data = await api.get('/tags');
        if (!data) return;
        setTags(data.tags);
    }

    const queryUrl = (userInfo && yourFeed) ? '/articles/feed' : '/articles';

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div>
            <PageTitle title="Conduit" summary="A place to share your knowledge."/>

            <nav>
                <br />
                <div className="flex-wrap">
                    <b>Popular Tags: </b>{tags.map(Tag)}
                </div>

                <br />
                <b>Views: </b>
                <Link to="/home">global feed</Link>&nbsp;&nbsp;
                {tag && (<>
                    <Link to={`/home?tag=${tag}`}>#{tag}</Link>&nbsp;&nbsp;
                </>)}
                {userInfo && <Link to={`/home?yourFeed=1`}>Your Feed</Link>}
            </nav>

            <ArticleList query={queryUrl} tag={tag} page={page}/>
        </div>
    );
}

export default Home;