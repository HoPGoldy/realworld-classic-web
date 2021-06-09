import { useRequest } from '@/plugins/api';

const ArticleLikeButton = function (props) {
    const { article: { favorited, favoritesCount, slug }, onChange } = props;

    const likeLabel = `${favorited ? '💗 liked' : '🤍 like'} ${favoritesCount}`;

    const { run: onClickLike } = useRequest({
        method: favorited ? 'delete' : 'post',
        url: `/articles/${slug}/favorite`
    }, {
        manual: true,
        onSuccess: data => onChange(data.article)
    });

    return (
        <span style={{ fontSize: 'medium' }} className="link-btn" onClick={onClickLike}>
            {likeLabel}
        </span>
    )
}

export default ArticleLikeButton;