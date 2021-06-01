import '@/common.css';

const CommentItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { author, createTime, body } = props;

    return (
        <li>
            <p>{body}</p>

            <ul>
                <li>
                    <b>Author:</b> {author.username}&nbsp;
                    <a href={author.image} target="__blank" title="see avatar">☻</a>
                </li>

                <li><b>Update at:</b> {createTime}</li>
            </ul>
        </li>
    );
}

export default CommentItem;