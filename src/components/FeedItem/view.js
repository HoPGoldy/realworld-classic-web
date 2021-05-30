import { Link } from 'react-router-dom'

const FeedItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { title, author, updatedAt, body } = props;
    
    return (
        <li>
            <div>
                <h2>{title}</h2>
            </div>

            <ul>
                <li><b>Author:</b> {author.username}</li>
                <li><b>Update at:</b> {updatedAt}</li>
            </ul>

            <p>{body}</p>
        </li>
    );
}

export default FeedItem;