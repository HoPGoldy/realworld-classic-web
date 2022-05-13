import Tag from '@/components/Tag';
import { Link } from 'react-router-dom';
import ArticleLikeButton from '@/components/ArticleLikeButton';

/** 列表中的单条文章 */
const FeedItem = function (props) {
    const { title, author, timeLabel, body, tagList, slug, updateItem } = props;

    return (
        <li>
            {/* 标题和喜欢按钮 */}
            <h2>
                <Link to={`/article/${slug}`}>{title}</Link>&nbsp;&nbsp;
                <ArticleLikeButton article={props} onChange={updateItem}/>
            </h2>

            <ul>
                <li>
                    <b>Author:</b> <Link to={`/user/${author.username}/my`}> {author.username}</Link>
                </li>

                <li><b>Update at:</b> {timeLabel}</li>

                {/* 标签列表 */}
                {tagList && tagList.length > 0 && <li>
                    <b>Tag:</b> {tagList.map(Tag)}
                </li>}
            </ul>

            <p>{body}</p>
        </li>
    );
}

export default FeedItem;