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
    const { tag, page = 0, author, favorited, query } = props;

    const [total, setTotal] = useState(0);
    const [articleList, setArticleList] = useState([]);

    const paginationGroup = useMemo(() => <Pagination total={total} size={NUMBER_PER_PAGE} />, [total]);

    const formatArticle = article => ({
        ...article,
        // 格式化日期
        timeLabel: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    })

    const onItemUpdate = newArticle => {
        const newList = articleList.map(item => {
            return (item.slug === newArticle.slug) ? formatArticle(newArticle) : item;
        });

        setArticleList(newList);
    }
    
    useEffect(() => {
        const fetchArticleList = async () => {
            setArticleList('loading');

            const data = await api.get(query || '/articles', {
                params: {
                    tag,
                    author,
                    favorited,
                    limit: NUMBER_PER_PAGE,
                    offset: page * NUMBER_PER_PAGE
                }
            });
    
            setArticleList(data?.articles?.map(formatArticle));
            setTotal(data?.articlesCount);
        }

        fetchArticleList();
    }, [tag, page, author, favorited, query]);

    if (!articleList) return <p style={{ color: 'red' }}>loading fail!</p>
    if (articleList === 'loading') return <p>loading...</p>
    if (articleList.length === 0) return <p>No articles are here... yet.</p>

    return (
        <>
            <section>
                <ul>
                    {articleList.map(feed => <FeedItem key={feed.slug} {...feed} updateItem={onItemUpdate} />)}
                </ul>
            </section>
    
            {total > 0 && <nav className="flex-wrap">
                <b>Pagination: </b>
                {paginationGroup}
            </nav>}
        </>
    );
}

export default ArtcleList;