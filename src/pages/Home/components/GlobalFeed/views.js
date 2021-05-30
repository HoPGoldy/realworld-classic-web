import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/api';
import FeedItem from '@/components/FeedItem/view'

const GlobalFeed = function () {
    const [articleList, setarticleList] = useState([]);
    const location = useLocation()
    console.log('🚀 ~ file: views.js ~ line 9 ~ GlobalFeed ~ location', location)

    const fetcharticleList = async () => {
        const resp = await api.get('/articles');
        setarticleList(resp.data?.articles);
    }

    useEffect(() => { fetcharticleList() }, []);

    if (!articleList) return <p style={{ color: 'red' }}>loading fail!</p>
    if (articleList.length === 0) return <p>loading...</p>
    
    return (<ul>
        {articleList.map(feed => <FeedItem key={feed.slug} {...feed} />)}
    </ul>);
}

export default GlobalFeed;