import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/api';
import FeedItem from '@/components/FeedItem/view';
import PaginationItem from '@/components/PaginationItem';
import dayjs from 'dayjs'

const NUMBER_PER_PAGE = 10;

const GlobalFeed = function () {
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [articleList, setarticleList] = useState([]);

    const location = useLocation();
    console.log('🚀 ~ file: views.js ~ line 9 ~ GlobalFeed ~ location', location)

    const paginationGroup = useMemo(() => {
        const maxPage = Math.ceil(total / NUMBER_PER_PAGE);
        return Array(maxPage).fill().map((_, index) => <PaginationItem page={index + 1}/>)
    }, [total])

    const fetcharticleList = async () => {
        const resp = await api.get('/articles');

        setarticleList(resp.data?.articles?.map(article => ({
            ...article,
            // 格式化日期
            timeLabel: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        })));
        setTotal(resp.data.articlesCount);
    }

    useEffect(() => {
        fetcharticleList();
    }, [page]);

    if (!articleList) return <p style={{ color: 'red' }}>loading fail!</p>
    if (articleList.length === 0) return <p>loading...</p>
    
    return (
        <>
            <section>
                <ul>
                    {articleList.map(feed => <FeedItem key={feed.slug} {...feed} />)}
                </ul>
            </section>
    
            <nav>
                <b>Pagination: </b>{paginationGroup}
            </nav>
        </>
    );
}

export default GlobalFeed;