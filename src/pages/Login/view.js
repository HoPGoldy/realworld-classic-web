import '@/common.css';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { createForm } from 'rc-form';
import { userContext } from '@/components/userContext';
import api from '@/api';

const Login = function (props) {
    const { form: { getFieldProps, getFieldError } } = props;
    const [errorMsg, setErrorMsg] = useState('');
    const [userInfo, setUserInfo] = useContext(userContext);
    const history = useHistory();

    const rules = [{ required: true }];

    const onSubmit = async () => {
        const user = await props.form.validateFields();
        setErrorMsg('');

        try {
            const resp = await api.post('users/login', { user });

            localStorage.setItem('token', resp.data.user.token);
            setUserInfo(resp.data.user);

            history.replace('/home');
        }
        catch (e) {
            console.error(e);
            if (e.toString().includes('422')) setErrorMsg('email or password is invalid');
            else setErrorMsg('sign in error');
        }
    }

    return (
        <section>
            <div className="form-area">
                {
                    errorMsg && <>
                        <span className="error">{errorMsg}</span>
                        <br />
                    </>
                }
                <label>
                    Email:
                    <input {...getFieldProps('email', { rules, initialValue: '' })} type="text" />
                </label>
                <span className="error">{getFieldError('email')}</span>
                <br />

                <label>
                    Password:
                    <input {...getFieldProps('password', { rules, initialValue: '' })} type="password" />
                </label>
                <span className="error">{getFieldError('password')}</span>
                <br />

                <button onClick={onSubmit}>Sign in</button>
            </div>
        </section>
    );
}

export default createForm()(Login);