import { useParams, Link, useHistory } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
import api, { useRequest } from '@/plugins/api';
import { useContext } from 'react';
import { useMount } from 'ahooks';
import { userContext } from '@/plugins/userContext';
import { createForm } from 'rc-form';
import { Tag, CommentItem, FollowButton, ArticleLikeButton, Separator } from '@/components';
import dayjs from 'dayjs';

/**
 * 文章正文页面
 */
const Article = function (props) {
    const { form: { getFieldProps, getFieldError, setFieldsValue } } = props;
    const history = useHistory();
    // 当前文章 id
    const { id } = useParams();
    // 当前用户信息
    const { userInfo } = useContext(userContext);

    const formatArticle = article => ({
        ...article,
        createTime: dayjs(article.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updateTime: dayjs(article.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    })

    const formatComment = comment => ({
        ...comment,
        createTime: dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
    })

    // 接口 - 获取评论
    const {
        data: comments = [], loading: commentLoading, error: commentError, run: fetchAtriclComment
    } = useRequest(`/articles/${id}/comments`, {
        manual: true,
        formatResult: data => data.comments.map(formatComment),
        loadingDelay: 1000
    });

    // 接口 - 获取文章详情
    const {
        data: article, loading: articleLoading, error: articleError, mutate: setArticle
    } = useRequest(`/articles/${id}`, {
        formatResult: data => formatArticle(data.article)
    });

    // 回调 - 提交评论
    const onSubmitComment = async () => {
        const comment = await props.form.validateFields();
        await api.post(`/articles/${id}/comments`, { comment });
        // 提交成功后清空输入框并重新加载评论
        setFieldsValue({ body: '' });
        fetchAtriclComment();
    }

    // 回调 -删除文章
    const onDelete = async () => {
        await api.delete(`/articles/${id}`);
        // 删除成功后返回用户页面
        history.replace(`/user/${userInfo.username}`);
    }

    useMount(fetchAtriclComment);

    // 载入校验
    if (articleLoading) return <p>Loading...</p>;
    if (articleError) return <p style={{ color: 'red' }}>article loading fail!</p>;

    const { title, description, createTime, updateTime, body, author, tagList } = article;

    // 评论载入校验
    let commentContent;
    if (commentError) commentContent = <p style={{ color: 'red' }}>comments loading fail!</p>;
    else if (commentLoading) commentContent = 'loading...';
    else if (comments.length <= 0) commentContent = 'No Comments.';
    else if (comments.length > 0) commentContent = comments.map(comment => {
        // 给评论传入当前用户信息，用于比对是否显示评论删除按钮
        return <CommentItem key={comment.id} article={article} {...comment} currentUserName={userInfo?.username} onDelete={fetchAtriclComment}/>;
    });

    // 是否为自己编辑
    const myArticle = userInfo ? userInfo.username === article.author.username : false;

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
                            <FollowButton userInfo={author} onUserInfoChange={author => setArticle({ ...article, author })} />
                            <Separator />
                            <ArticleLikeButton article={article} onChange={detail => setArticle(formatArticle(detail))} />
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
                <br />

                <button type="button" onClick={onSubmitComment}>Post Comment</button>
            </form>
            <ul>{commentContent}</ul>
        </section>
    );
}

export default createForm()(Article);