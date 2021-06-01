import { useState, useEffect, useMemo } from 'react';
import api from '@/api';
import FeedItem from '@/components/FeedItem/view';
import Pagination from '@/components/Pagination';
import dayjs from 'dayjs';
import '@/common.css';

/** 每页展示的文章数量 */
const NUMBER_PER_PAGE = 10;

/**
 * 文章列表
 * props 为查询列表需要的条件 
 */
const ArtcleList = function (props) {
    const { tag, page = 0, author, favorited } = props;

    const [total, setTotal] = useState(0);
    const [articleList, setArticleList] = useState([]);

    const paginationGroup = useMemo(() => <Pagination total={total} size={NUMBER_PER_PAGE} />, [total])
    
    useEffect(() => {
        const fetchArticleList = async () => {
            setArticleList([]);
    
            const resp = await api.get('/articles', {
                params: {
                    tag,
                    author,
                    favorited,
                    limit: NUMBER_PER_PAGE,
                    offset: page * NUMBER_PER_PAGE
                }
            });
    
            setArticleList(resp.data?.articles?.map(article => ({
                ...article,
                // 格式化日期
                timeLabel: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            })));
            setTotal(resp.data.articlesCount);
        }

        fetchArticleList()
    }, [tag, page, author, favorited]);

    if (!articleList) return <p style={{ color: 'red' }}>loading fail!</p>
    if (articleList.length === 0) return <p>loading...</p>

    return (
        <>
            <section>
                <ul>
                    {articleList.map(feed => <FeedItem key={feed.slug} {...feed} />)}
                </ul>
            </section>
    
            <nav className="flex-wrap">
                <b>Pagination: </b>
                {paginationGroup}
            </nav>
        </>
    );
}

export default ArtcleList;