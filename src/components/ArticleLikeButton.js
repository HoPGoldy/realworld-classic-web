import { useRequest } from '@/plugins/api';

/** 文章喜欢按钮 */
const ArticleLikeButton = function (props) {
    const { article: { favorited, favoritesCount, slug }, onChange } = props;

    // 按钮显示内容
    const likeLabel = `${favorited ? '💗 liked' : '🤍 like'} ${favoritesCount}`;

    const { run: onClickLike } = useRequest({
        method: favorited ? 'delete' : 'post',
        url: `/articles/${slug}/favorite`
    }, {
        manual: true,
        // 喜欢成功后更新文章数据以刷新按钮
        onSuccess: data => onChange(data.article)
    });

    return (
        <span style={{ fontSize: 'medium' }} className="link-btn" onClick={onClickLike}>
            {likeLabel}
        </span>
    )
}

export default ArticleLikeButton;