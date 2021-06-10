import { useHistory } from 'react-router-dom';
import { PageTitle, ApiError } from '@/components';
import { useRequest, setToken } from '@/plugins/api';
import { createForm } from 'rc-form';
import { useState, useContext } from 'react';
import { userContext } from '@/plugins/userContext';

/**
 * 用户设置页面
 */
const Profile = function (props) {
    const { form: { getFieldProps, getFieldError } } = props;
    const history = useHistory();
    // 后端校验错误信息
    const [errorMsg, setErrorMsg] = useState(undefined);
    const { userInfo, setUserInfo } = useContext(userContext);

    // 请求 - 上传新的用户配置
    const { run: postSetting } = useRequest(user => ({ url: '/user', method: 'put', data: { user } }), {
        manual: true,
        // 成功之后把信息更新到本地
        onSuccess: ({ user }) => {
            setUserInfo(user);
            localStorage.setItem('token', user.token);
            history.push(`/user/${user.username}`);
        },
        // 失败之后显示报错信息
        onError: ({ response }) => {
            console.error(response.data.errors);
            setErrorMsg(response.data.errors);
        }
    })

    // 回调 - 点击提交请求按钮
    const onSubmitSetting = async () => {
        setErrorMsg(undefined);
        const user = await props.form.validateFields();
        postSetting(user);
    }

    // 回调 - 点击登出按钮
    const onLogout = () => {
        localStorage.removeItem('token');
        setUserInfo(undefined);
        setToken(undefined);
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
                        {...getFieldProps('image', { initialValue: userInfo.image || '' })}
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

                <button type="button" onClick={onSubmitSetting}> Update Settings </button>
            </form>
            <span className="link-btn" onClick={onLogout}>Or click here to logout.</span>
            <br /><br />
        </section>
    );
}

export default createForm()(Profile);