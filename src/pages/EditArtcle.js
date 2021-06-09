import { useParams, useHistory } from 'react-router-dom';
import { PageTitle, ApiError } from '@/components';
import api from '@/plugins/api';
import { createForm } from 'rc-form';
import { useEffect, useState } from 'react';

/**
 * 文章编辑 / 新增页面
 */
const EditArticle = function (props) {
    const { form: { getFieldProps, getFieldError } } = props;
    const [article, setArticle] = useState(undefined);
    const { id } = useParams();
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState(undefined);

    useEffect(() => {
        const fetchArticle = async () => {
            const data = await api.get(`/articles/${id}`);

            setArticle({
                ...data.article,
                tag: data.article.tagList.join(',')
            });
        }

        if (id) fetchArticle();
        else {
            setArticle({
                title: '',
                description: '',
                body: '',
                tag: ''
            });
        }
    }, [id]);

    const onSubmitComment = async () => {
        const formData = await props.form.validateFields();

        const article = {
            ...formData,
            // 分隔 tag 并去除前后空格
            tagList: formData.tag.split(',').map(tag => tag.replace(/(^\s*)|(\s*$)/g,""))
        }

        try {
            const data = await api.post('/articles', { article });
            history.push(`/article/${data.article.slug}`);
        }
        catch (e) {
            console.error(e.response.data.errors);
            setErrorMsg(e.response.data.errors);
        }
    }

    if (!article) return 'loading...';

    return (
        <section>
            <PageTitle title={id ? 'Edit Article' : 'Create new Article'}/>

            <form>
                <ApiError errorMsg={errorMsg} />

                <label>
                    <summary>Title: </summary>
                    <input
                        type="text"
                        placeholder="Article Title"
                        {...getFieldProps('title', { rules: [{ required: true }], initialValue: article.title })}
                    />
                </label>
                <span className="error">{getFieldError('title')}</span>
                <br />

                <label>
                    <summary>Description: </summary>
                    <input
                        type="text"
                        placeholder="What's this article about?"
                        {...getFieldProps('description', { rules: [{ required: true }], initialValue: article.description })}
                    />
                </label>
                <span className="error">{getFieldError('description')}</span>
                <br />

                <label>
                    <summary>Content: </summary>
                    <textarea
                        placeholder="Write your article (in markdown)"
                        {...getFieldProps('body', { rules: [{ required: true }], initialValue: article.body })}
                        style={{ height: '50px' }}
                    />
                </label>
                <span className="error">{getFieldError('body')}</span>
                <br />

                <label>
                    <summary>Tag: </summary>
                    <input
                        type="text"
                        placeholder="Enter tags"
                        {...getFieldProps('tag', { initialValue: article.tag })}
                    />
                </label>
                <span className="error">{getFieldError('tag')}</span>
                <br />

                <button type="button" onClick={onSubmitComment}> Publish Article </button>
            </form>
        </section>
    );
}

export default createForm()(EditArticle);