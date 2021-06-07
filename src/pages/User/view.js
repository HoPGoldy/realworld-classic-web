
import { Link, useParams, useHistory } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import '@/common.css';
import PageTitle from '@/components/PageTitle';
import ArticleList from '@/components/ArticleList';
import useLocation from '@/components/useLocation';
import useUserInfo from '@/components/useUserInfo';
import FollowButton from '@/components/FollowButton';
import Separator from '@/components/Separator';
import { userContext } from '@/components/userContext';

const User = function () {
    const TAB = [
        { key: 'my', label: 'My Articles' },
        { key: 'favorited', label: 'Favorited Articles' }
    ]

    const { username, tab } = useParams();
    const [userInfo, setUserInfo] = useUserInfo(username);
    const location = useLocation();
    const { page } = location.query;
    const history = useHistory();
    const [selfInfo] = useContext(userContext);

    useEffect(() => {    
        // 当前没有 tab 选中或者选中了未知的 tab，重定向
        if (!tab || !TAB.find(({ key }) => key === tab)) {
            history.replace(`/user/${username}/${TAB[0].key}`);
            return 'Redirecting...';
        }
    }, [tab])

    // 是否为自己编辑
    const isMyself = selfInfo ? selfInfo.username === username : undefined;

    return (
        <div>
            <PageTitle title={username} summary={() => (
                <span>
                    <b>User</b>
                    <Separator />
                    {userInfo.bio && <>{userInfo.bio}<Separator /></>}
                    {
                        isMyself ?
                            <Link to="/settings">🔨 Edit Profile Settings</Link> :
                            <FollowButton userInfo={userInfo} onUserInfoChange={setUserInfo} />
                    }
                    <Separator />
                    <a href={userInfo.image} target="__blank">🎫 see Avatar</a></span>
            )}/>

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
                author={tab !== 'favorited' ? username : undefined}
                favorited={tab === 'favorited' ? username : undefined}
            />
        </div>
    );
}

export default User;