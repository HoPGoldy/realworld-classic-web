import Tag from '@/components/Tag';
import { Link } from 'react-router-dom';
import ArticleLikeButton from '@/components/ArticleLikeButton';

const FeedItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { title, author, timeLabel, body, tagList, slug, updateItem } = props;

    return (
        <li>
            <div>
                <h2>
                    <Link to={`/article/${slug}`}>{title}</Link>&nbsp;&nbsp;
                    <ArticleLikeButton article={props} onChange={updateItem}/>
                </h2>
            </div>

            <ul>
                <li>
                    <b>Author:</b> <Link to={`/user/${author.username}/my`}> {author.username}</Link>
                </li>

                <li><b>Update at:</b> {timeLabel}</li>

                {tagList && tagList.length > 0 && <li className="flex-wrap">
                    <b>Tag:</b> {tagList.map(Tag)}
                </li>}
            </ul>

            <p>{body}</p>
        </li>
    );
}

export default FeedItem;