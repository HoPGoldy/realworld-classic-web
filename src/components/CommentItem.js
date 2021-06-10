import { useRequest } from '@/plugins/api';

/** 单条评论 */
const CommentItem = function (props) {
    const { author, createTime, body, currentUserName, id, article: { slug }, onDelete } = props;

    // 请求 - 删除评论
    const { run: onDeleteComment } = useRequest({
        url: `/articles/${slug}/comments/${id}`, method: 'delete'
    }, {
        manual: true,
        // 删除成功后触发外界重新加载列表
        onSuccess: onDelete
    })

    let deleteContent = null;
    // 如果是自己写的，就显示删除按钮
    if (currentUserName === author.username) {
        deleteContent = (
            <span className="link-btn" style={{ color: 'red' }} onClick={onDeleteComment}>
                ❌ Delete Comment
            </span>
        );
    }

    return (
        <li>
            <p>{body} {deleteContent}</p>

            <ul>
                <li><b>Author:</b> {author.username}</li>
                <li><b>Update at:</b> {createTime}</li>
            </ul>
        </li>
    );
}

export default CommentItem;