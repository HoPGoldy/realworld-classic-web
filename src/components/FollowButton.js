import { useRequest } from '@/plugins/api';

/** 文章喜欢按钮 */
const FollowButton = function (props) {
    const { userInfo, onUserInfoChange } = props;

    // 请求 - 点击喜欢按钮
    const { run: onChangeFollow } = useRequest({
        url: `/profiles/${userInfo.username}/follow`,
        // 如果已经喜欢的话就取消喜欢
        method: userInfo.following ? 'delete' : 'post'
    }, {
        manual: true,
        // 请求成功后把新的文章数据更新回列表
        onSuccess: data => onUserInfoChange(data.profile)
    })

    return (
        <span className="link-btn" onClick={onChangeFollow}>
            {`${userInfo.following ? '😀 unfollow' : '😶 follow'} ${userInfo.username}`}
        </span>
    )
}

export default FollowButton;