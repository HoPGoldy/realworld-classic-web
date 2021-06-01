import renderTag from '@/components/renderTag';
import { Link } from 'react-router-dom';
import '@/common.css';

const FeedItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { title, author, timeLabel, body, tagList, slug } = props;

    return (
        <li>
            <div>
                <h2>
                    <Link to={`/article/${slug}`}>{title}</Link>
                </h2>
            </div>

            <ul>
                <li>
                    <b>Author:</b> <Link to={`/user/${author.username}`}>{author.username}</Link>&nbsp;
                    <a href={author.image} target="__blank" title="see avatar">☻</a>
                </li>

                <li><b>Update at:</b> {timeLabel}</li>

                {tagList && tagList.length > 0 && <li className="flex-wrap">
                    <b>Tag:</b> {tagList.map(renderTag)}
                </li>}
            </ul>

            <p>{body}</p>
        </li>
    );
}

export default FeedItem;