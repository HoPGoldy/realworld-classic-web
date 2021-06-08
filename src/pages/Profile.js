import { useHistory } from 'react-router-dom';
import { PageTitle, ApiError } from '@/components';
import api from '@/plugins/api';
import { createForm } from 'rc-form';
import { useState, useContext } from 'react';
import { userContext } from '@/plugins/userContext';

/**
 * 文章正文页面
 */
const Profile = function (props) {
    const { form: { getFieldProps, getFieldError } } = props;
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState(undefined);
    const [userInfo, setUserInfo] = useContext(userContext);

    const onSubmitComment = async () => {
        setErrorMsg(undefined);
        const user = await props.form.validateFields();
        try {
            const data = await api.put('/user', { user });
            setUserInfo(data.user);
            localStorage.setItem('token', data.user.token);
            history.push(`/user/${data.user.username}`);
        }
        catch (e) {
            console.error(e.response.data.errors);
            setErrorMsg(e.response.data.errors);
        }
    }

    const onLogout = () => {
        localStorage.removeItem('token');
        setUserInfo(undefined);
        history.push('/home');
    }

    if (!userInfo) return 'loading...';

    return (
        <section>
            <PageTitle title="Your Settings" />

            <form>
                <ApiError errorMsg={errorMsg} />
                <label>
                    <summary>Avatar: </summary>
                    <input
                        type="text"
                        placeholder="URL of profile picture"
                        {...getFieldProps('image', { initialValue: userInfo.image | '' })}
                    />
                </label>
                <span className="error">{getFieldError('image')}</span>
                <br />

                <label>
                    <summary>Username: </summary>
                    <input
                        type="text"
                        placeholder="Your username here"
                        {...getFieldProps('username', { rules: [{ required: true }], initialValue: userInfo.username })}
                    />
                </label>
                <span className="error">{getFieldError('username')}</span>
                <br />

                <label>
                    <summary>BIO: </summary>
                    <textarea
                        placeholder="Short bio about you"
                        {...getFieldProps('bio', { initialValue: userInfo.bio || ''})}
                        style={{ height: '50px' }}
                    />
                </label>
                <span className="error">{getFieldError('bio')}</span>
                <br />

                <label>
                    <summary>Email: </summary>
                    <input
                        type="text"
                        placeholder="your login email"
                        {...getFieldProps('email', { rules: [{ required: true }], initialValue: userInfo.email })}
                    />
                </label>
                <span className="error">{getFieldError('email')}</span>
                <br />

                <label>
                    <summary>Password: </summary>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        {...getFieldProps('password', { initialValue: '' })}
                    />
                </label>
                <span className="error">{getFieldError('password')}</span>
                <br />

                <button type="button" onClick={onSubmitComment}> Update Settings </button>
            </form>
            <span class="link-btn" onClick={onLogout}>Or click here to logout.</span>
        </section>
    );
}

export default createForm()(Profile);