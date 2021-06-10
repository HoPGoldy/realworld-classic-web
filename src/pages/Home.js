import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ArticleList, Tag, PageTitle } from '@/components';
import { useRequest } from '@/plugins/api';
import useLocation from '@/plugins/useLocation';
import { userContext } from '@/plugins/userContext';

/**
 * 入口首页
 */
const Home = function () {
    const { userInfo } = useContext(userContext);
    const location = useLocation();
    const { tag, page = 0, yourFeed } = location.query;

    // 获取热门标签信息
    const { data: tags = [] } = useRequest('/tags', { formatResult: data => data.tags });
    // 根据当前选择的 tab 页确定要查询的接口
    const queryUrl = (userInfo && yourFeed) ? '/articles/feed' : '/articles';

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
                {/* 登录之后再显示该标签页 */}
                {userInfo && <Link to={`/home?yourFeed=1`}>Your Feed</Link>}
            </nav>

            <ArticleList url={queryUrl} tag={tag} page={page}/>
        </div>
    );
}

export default Home;