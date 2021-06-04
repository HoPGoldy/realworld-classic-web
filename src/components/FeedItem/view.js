import renderTag from '@/components/renderTag';
import { Link } from 'react-router-dom';
import api from '@/api';
import '@/common.css';

const FeedItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { title, author, timeLabel, body, tagList, slug, favorited, favoritesCount, updateItem } = props;

    const likeLabel = `${favorited ? '💗 liked' : '🤍 like'} ${favoritesCount}`;

    const onClickLike = async () => {
        const url = `/articles/${slug}/favorite`;

        const data = favorited ? await api.delete(url) : await api.post(url);
        updateItem(data.article);
    }

    return (
        <li>
            <div>
                <h2>
                    <Link to={`/article/${slug}`}>{title}</Link>
                    <span style={{ cursor: 'pointer', fontSize: 'medium' }} onClick={onClickLike}>
                        &nbsp;&nbsp;{likeLabel}
                    </span>
                </h2>
            </div>

            <ul>
                <li>
                    <b>Author:</b> <Link to={`/user/${author.username}/my`}>{author.username}</Link>&nbsp;
                    <a href={author.image} target="__blank" title="see avatar">⚅</a>
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