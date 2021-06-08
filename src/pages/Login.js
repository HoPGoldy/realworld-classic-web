import { useState, useContext, useEffect } from 'react';
import { useHistory, Link, useLocation } from 'react-router-dom';
import { createForm } from 'rc-form';
import { userContext } from '@/plugins/userContext';
import { PageTitle, ApiError } from '@/components';
import api, { setToken } from '@/plugins/api';

const Login = function (props) {
    const { form: { getFieldProps, getFieldError, resetFields } } = props;
    const [errorMsg, setErrorMsg] = useState(undefined);
    const [setUserInfo] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();

    const rules = [{ required: true }];

    const isLoginPage = () => location.pathname === '/login';

    const onSubmit = async () => {
        const user = await props.form.validateFields();
        setErrorMsg(undefined);

        try {
            const url = isLoginPage() ? 'users/login' : 'users';
            const data = await api.post(url, { user });

            localStorage.setItem('token', data.user.token);
            setToken(data.user.token);
            setUserInfo(data.user);

            history.replace('/home');
        }
        catch (e) {
            console.error(e.response.data.errors);
            setErrorMsg(e.response.data.errors);
        }
    }

    const renderField = (label, field, type) => (
        <>
            <label>
                {label}:
                <input {...getFieldProps(field, { rules, initialValue: '' })} type={type || 'text'} />
            </label>
            <span className="error">{getFieldError(field)}</span>
            <br />
        </>
    );

    useEffect(() => {
        setErrorMsg([]);
        resetFields();
    }, [location.pathname])

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

                <button type="button" onClick={onSubmit}>
                    {isLoginPage() ? 'Sign in' : 'Sign up'}
                </button>
            </form>
        </section>
    );
}

export default createForm()(Login);