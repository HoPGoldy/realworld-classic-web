import { useParams, Link, useHistory } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
import api from '@/plugins/api';
import { useState, useEffect, useContext } from 'react';
import { userContext } from '@/plugins/userContext';
import { createForm } from 'rc-form';
import { Tag, CommentItem, FollowButton, ArticleLikeButton, Separator } from '@/components';
import dayjs from 'dayjs';

/**
 * 文章正文页面
 */
const Article = function (props) {
    const { form: { getFieldProps, getFieldError } } = props;
    const { id } = useParams();
    const [articleDetail, setArticleDetail] = useState({});
    const [articleComments, setArticleComments] = useState('loading');
    const [userInfo] = useContext(userContext);
    const history = useHistory();

    const fetchArticleDetail = async () => {
        const data = await api.get(`/articles/${id}`);
        setArticleDetail(formatArticle(data.article));
    }

    const formatArticle = (article) => ({
        ...article,
        createTime: dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    })

    const fetchAtriclComment = async () => {
        const data = await api.get(`/articles/${id}/comments`);

        const comments = data.comments.map(comment => ({
            ...comment,
            createTime: dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }));

        setArticleComments(comments);
    }

    const onUserInfoChange = (author) => {
        const newArticleDetail = { ...articleDetail, author };
        setArticleDetail(newArticleDetail);
    }

    const onSubmitComment = async () => {
        const comment = await props.form.validateFields();
        await api.post(`/articles/${id}/comments`, { comment })
        fetchAtriclComment()
    }

    const onDelete = async () => {
        await api.delete(`/articles/${id}`);
        history.replace(`/user/${userInfo.username}`);
    }

    useEffect(() => {
        fetchArticleDetail();
        fetchAtriclComment();
    }, [id]);

    if (Object.keys(articleDetail).length <= 0) return <p>Loading...</p>;

    const { title, description, createTime, updateTime, body, author, tagList } = articleDetail;

    let commentContent;
    if (!articleComments) commentContent = <p style={{ color: 'red' }}>loading fail!</p>;
    else if (articleComments === 'loading') commentContent = 'loading...';
    else if (articleComments.length <= 0) commentContent = 'No Comments.';
    else if (articleComments.length > 0) commentContent = articleComments.map(comment => {
        return <CommentItem key={comment.id} article={articleDetail} {...comment} currentUserName={userInfo.username} onDelete={fetchAtriclComment}/>;
    });

    // 是否为自己编辑
    const myArticle = userInfo ? userInfo.username === articleDetail.author.username : false;

    return (
        <section>
            <PageTitle title={title} summary={() => (
                <span>
                    <b>Article</b>
                    <Separator />
                    {
                        myArticle ? <>
                            <Link to={`/editor/${id}`}>📝 Edit article</Link>
                            <Separator />
                            <span className="link-btn" style={{ color: 'red' }} onClick={onDelete}>❌ Delete article</span>
                        </> :
                        <>
                            <FollowButton userInfo={author} onUserInfoChange={onUserInfoChange} />
                            <Separator />
                            <ArticleLikeButton article={articleDetail} onChange={detail => setArticleDetail(formatArticle(detail))}/>
                        </>
                    }
                </span>
            )}/>

            <br />
            <b>Description: </b>{description}

            <br /><br />
            <b>Author: </b> <Link to={`/user/${author.username}`}> {author.username}</Link>

            <br /><br />
            <b>Created at: </b>{createTime}

            <br /><br />
            <b>Updated at: </b>{updateTime}

            {tagList && tagList.length > 0 && <>
                <br /><br />
                <div className="flex-wrap">
                    <b>Tag:</b> {tagList.map(Tag)}
                </div>
            </>}

            <h2>Content:</h2>
            <ul>{body}</ul>

            <h2>Comment:</h2>
            <form>
                <textarea
                    placeholder="type your comment here."
                    {...getFieldProps('body', { rules: [{ required: true }], initialValue: '' })}
                    style={{ height: '50px' }}
                />
                <span className="error">{getFieldError('body')}</span>

                <button type="button" onClick={onSubmitComment}>Post Comment</button>
            </form>
            <ul>{commentContent}</ul>
        </section>
    );
}

export default createForm()(Article);