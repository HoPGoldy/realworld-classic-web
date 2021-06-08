import api from '@/plugins/api';

const ArticleLikeButton = function (props) {
    const { article: { favorited, favoritesCount, slug }, onChange } = props;

    const likeLabel = `${favorited ? '💗 liked' : '🤍 like'} ${favoritesCount}`;

    const onClickLike = async () => {
        const url = `/articles/${slug}/favorite`;

        const data = favorited ? await api.delete(url) : await api.post(url);
        onChange(data.article);
    }

    return (
        <span style={{ fontSize: 'medium' }} className="link-btn" onClick={onClickLike}>
            {likeLabel}
        </span>
    )
}

export default ArticleLikeButton;