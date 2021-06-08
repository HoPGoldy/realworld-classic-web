import api from '@/plugins/api';

const FollowButton = function (props) {
    const { userInfo, onUserInfoChange } = props;

    const onChangeFollow = async () => {
        const data = userInfo.following ?
        await api.delete(`/profiles/${userInfo.username}/follow`) :
        await api.post(`/profiles/${userInfo.username}/follow`);
    
        onUserInfoChange(data.profile);
    }

    return (
        <span className="link-btn" onClick={onChangeFollow}>
            {`${userInfo.following ? '😀 unfollow' : '😶 follow'} ${userInfo.username}`}
        </span>
    )
}

export default FollowButton;