import "./App.css";
import { useContext, useEffect } from "react";
import { Home, Login, Article, User } from "./pages";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { footer } from "@/components/Footer/view";
import { userContext } from "@/components/userContext";
import api, { setToken } from "@/api";

function App() {
    const [userInfo, setUserInfo] = useContext(userContext);

    // 如果本地有 token 的话，就尝试用其获取用户信息
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setToken(token);

        const getUserInfo = async () => {
            const data = await api.get("user");
            setUserInfo(data?.user);
        };

        getUserInfo();
    }, []);

    return (
        <div>
            <header className="header-area">
                <b><Link to="/">conduit</Link></b>
                <div>
                    <Link to="/">Home</Link>&nbsp;|&nbsp;
                    {userInfo ? (
                        <>
                            <Link to="/login">New Article</Link>&nbsp;|&nbsp;
                            <Link to="/register">Setting</Link>&nbsp;|&nbsp;
                            <Link to="/login">{userInfo.username}</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Sign in</Link>&nbsp;|&nbsp;
                            <Link to="/register">Sign up</Link>
                        </>
                    )}
                </div>
            </header>

            <Switch>
                <Route path={["/register", "/login"]} component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/article/:id" component={Article} />
                <Route
                    path={["/user/:username/:tab", "/user/:username"]}
                    component={User}
                />
                <Redirect from="/" to="/home" />
            </Switch>

            {footer}
        </div>
    );
}

export default App;
