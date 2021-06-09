import { useRequest } from '@/plugins/api';

const CommentItem = function (props) {
    const { author, createTime, body, currentUserName, id, article: { slug }, onDelete } = props;

    const { run: onDeleteComment } = useRequest({
        url: `/articles/${slug}/comments/${id}`, method: 'delete'
    }, {
        manual: true,
        onSuccess: onDelete
    })

    let deleteContent = null;
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