
import { Link, useParams, useHistory } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { PageTitle, ArticleList, FollowButton, Separator } from '@/components';
import useLocation from '@/plugins/useLocation';
import { userContext } from '@/plugins/userContext';
import api from '@/plugins/api';

const User = function () {
    const TAB = [
        { key: 'my', label: 'My Articles' },
        { key: 'favorited', label: 'Favorited Articles' }
    ]

    const { username, tab } = useParams();
    const [userInfo, setUserInfo] = useState({});
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
    }, [tab]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await api.get(`/profiles/${username}`)
            setUserInfo(data.profile)
        }

        fetchUserInfo();
    }, [username]);

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