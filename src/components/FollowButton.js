import { useRequest } from '@/plugins/api';

const FollowButton = function (props) {
    const { userInfo, onUserInfoChange } = props;

    const { run: onChangeFollow } = useRequest({
        url: `/profiles/${userInfo.username}/follow`,
        method: userInfo.following ? 'delete' : 'post'
    }, {
        manual: true,
        onSuccess: data => onUserInfoChange(data.profile)
    })

    return (
        <span className="link-btn" onClick={onChangeFollow}>
            {`${userInfo.following ? '😀 unfollow' : '😶 follow'} ${userInfo.username}`}
        </span>
    )
}

export default FollowButton;