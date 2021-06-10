import { useMemo } from 'react';
import { useRequest } from '@/plugins/api';
import FeedItem from '@/components/FeedItem';
import Pagination from '@/components/Pagination';
import dayjs from 'dayjs';

/** 每页展示的文章数量 */
const NUMBER_PER_PAGE = 10;

/**
 * 文章列表
 * props 为查询列表需要的条件 
 */
const ArticleList = function (props) {
    const { tag, page = 0, author, favorited, url = '/articles' } = props;
    
    const formatArticle = article => ({
        ...article,
        // 格式化日期
        timeLabel: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    });

    // 列表获取接口有可能是文章列表，也有可能是我的关注，所以这里的 url 可以被外部指定
    const service = {
        url,
        params: {
            author, favorited, tag,
            limit: NUMBER_PER_PAGE,
            offset: page * NUMBER_PER_PAGE
        }
    }

    // 发起请求
    const { data: { articles, total }, error, loading, mutate } = useRequest(service, {
        initialData: { articles: [], total: 0 },
        refreshDeps: [author, favorited, url, tag, page],
        formatResult: ({ articles, articlesCount: total }) => ({ articles: articles.map(formatArticle), total })
    });

    // 总页数变更了就重新渲染分页项
    const paginationGroup = useMemo(() => <Pagination total={total} size={NUMBER_PER_PAGE} />, [total]);

    // 回调 - 突变文章
    // 用于更新文章的喜欢状态
    const onItemUpdate = newArticle => {
        const newList = articles.map(item => {
            return (item.slug === newArticle.slug) ? formatArticle(newArticle) : item;
        });

        mutate({ articles: newList, total });
    }

    // 加载校验
    if (error) return <p style={{ color: 'red' }}>loading fail!</p>
    if (loading) return <p>loading...</p>
    if (articles.length === 0) return <p>No articles are here... yet.</p>

    return (
        <>
            <section>
                <ul>
                    {articles.map(feed => <FeedItem key={feed.slug} {...feed} updateItem={onItemUpdate} />)}
                </ul>
            </section>
    
            {total > 0 && <nav className="flex-wrap">
                <b>Pagination: </b>
                {paginationGroup}
                <br /><br />
            </nav>}
        </>
    );
}

export default ArticleList;