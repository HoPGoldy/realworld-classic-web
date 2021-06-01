
import { Link, useParams, useHistory } from 'react-router-dom';
import '@/common.css';
import PageTitle from '@/components/PageTitle';
import ArticleList from '@/components/ArticleList';
import useLocation from '@/components/useLocation';

const User = function () {
    const TAB = [
        { key: 'my', label: 'My Articles' },
        { key: 'favorited', label: 'Favorited Articles' }
    ]

    const { username, tab } = useParams();
    const location = useLocation();
    const { page } = location.query;
    const history = useHistory();

    // 当前没有 tab 选中或者选中了未知的 tab，重定向
    if (!tab || !TAB.find(({ key }) => key === tab)) {
        history.replace(`/user/${username}/${TAB[0].key}`);
        return 'redirecting...';
    }

    return (
        <div>
            <PageTitle title={username}/>

            <nav>
                <br />
                <b>Views: </b>
                {TAB.map(tab => (
                    <span key={tab.key}>
                        &nbsp;<Link to={`/user/${username}/${tab.key}`}>{tab.label}</Link>&nbsp;
                    </span>
                ))}
            </nav>

            <ArticleList
                page={page}
                author={tab === 'my' ? username : undefined}
                favorited={tab === 'favorited' ? username : undefined}
            />
        </div>
    );
}

export default User;