import { useState, useContext, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { createForm } from 'rc-form';
import { userContext } from '@/plugins/userContext';
import { PageTitle, ApiError } from '@/components';
import api, { setToken } from '@/plugins/api';

/**
 * 登录 / 注册页面
 */
const Login = function (props) {
    const { form: { getFieldProps, getFieldError, resetFields } } = props;
    const { setUserInfo } = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    // 后端校验报错
    const [errorMsg, setErrorMsg] = useState(undefined);

    // 判断当前是否为登录页，还是注册页
    const isLoginPage = () => location.pathname === '/login';

    // 回调 - 进行登录或进行注册
    const onSubmit = async () => {
        const user = await props.form.validateFields();
        setErrorMsg(undefined);

        try {
            // 根据当前页面状态决定是登录还是注册
            const url = isLoginPage() ? 'users/login' : 'users';
            const data = await api.post(url, { user });

            // 成功后把用户信息保存到本地并更新应用状态
            localStorage.setItem('token', data.user.token);
            setToken(data.user.token);
            setUserInfo(data.user);
            
            history.replace('/home');
        }
        catch (e) {
            // 登录失败
            console.error(e.response.data.errors);
            setErrorMsg(e.response.data.errors);
        }
    }

    // 渲染表单字段
    const renderField = (label, field, type) => (
        <>
            <label>
                {label}:
                <input {...getFieldProps(field, { rules: [{ required: true }], initialValue: '' })} type={type || 'text'} />
            </label>
            <span className="error">{getFieldError(field)}</span>
            <br />
        </>
    );

    // 页面发生变更后就清空报错信息并重置输入
    useEffect(() => {
        setErrorMsg([]);
        resetFields();
    }, [location.pathname, resetFields]);

    // 根据当前状态确定登录 / 注册页头
    const titleContent = isLoginPage() ?
        <PageTitle title="Sign in" summary={() => <Link to="/register">Need an account?</Link>}/> :
        <PageTitle title="Sign up" summary={() => <Link to="/login">Have an account?</Link>}/>;

    return (
        <section>
            {titleContent}

            <form>
                <ApiError errorMsg={errorMsg} />

                {!isLoginPage() && renderField('Username', 'username')}
                {renderField('Email', 'email')}
                {renderField('Password', 'password', 'password')}
                <br />

                <button type="button" onClick={onSubmit}>
                    {isLoginPage() ? 'Sign in' : 'Sign up'}
                </button>
            </form>
        </section>
    );
}

export default createForm()(Login);