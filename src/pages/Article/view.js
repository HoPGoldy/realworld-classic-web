import { useParams } from 'react-router-dom';
import PageTitle from '@/components/PageTitle';
import api from '@/api';
import '@/common.css';
import { useState, useEffect } from 'react';
import renderTag from '@/components/renderTag';
import CommentItem from '@/components/CommentItem';
import dayjs from 'dayjs';

/**
 * 文章正文页面
 */
const Article = function () {
    const { id } = useParams();
    const [articleDetail, setArticleDetail] = useState({});
    const [articleComments, setArticleComments] = useState([]);

    const fetchAtriclDetail = async () => {
        const resp = await api.get(`/articles/${id}`);

        const detail = resp.data.article;
        detail.createTime = dayjs(detail.createdAt).format('YYYY-MM-DD HH:mm:ss');
        detail.updateTime = dayjs(detail.updatedAt).format('YYYY-MM-DD HH:mm:ss');

        setArticleDetail(detail);
    }

    const fetchAtriclComment = async () => {
        const resp = await api.get(`/articles/${id}/comments`);

        const comments = resp.data.comments.map(comment => ({
            ...comment,
            createTime: dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
        }));

        setArticleComments(comments);
    }

    useEffect(() => {
        fetchAtriclDetail();
        fetchAtriclComment();
    }, [id]);

    if (Object.keys(articleDetail).length <= 0) return <p>Loading...</p>;

    const { title, description, createTime, updateTime, body, author, tagList } = articleDetail;

    return (
        <section>
            <PageTitle title={title}/>
            
            <br />
            <b>Description: </b>{description}

            <br /><br />
            <b>Author: </b> {author.username}&nbsp;
            <a href={author.image} target="__blank" title="see avatar">☻</a>

            <br /><br />
            <b>Created at: </b>{createTime}

            <br /><br />
            <b>Updated at: </b>{updateTime}

            {tagList && tagList.length > 0 && <>
                <br /><br />
                <div className="flex-wrap">
                    <b>Tag:</b> {tagList.map(renderTag)}
                </div>
            </>}

            <h2>Content:</h2>
            <ul>{body}</ul>

            <h2>Comment:</h2>
            <ul>
                {articleComments.map(comment => <CommentItem key={comment.id} {...comment} />)}
            </ul>
        </section>
    );
}

export default Article;