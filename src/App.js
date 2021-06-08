import { useContext, useEffect } from "react";
import { Home, Login, Article, User, EditArtcle, Profile } from "./pages";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Separator, footer } from "@/components";
import { userContext } from "@/plugins/userContext";
import api, { setToken } from "@/plugins/api";

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
            <header className="header-area flex-wrap">
                <b><Link to="/">conduit</Link></b>
                <div>
                    <Link to="/">Home</Link>
                    <Separator />
                    {userInfo ? (
                        <>
                            <Link to="/editor">New Article</Link>
                            <Separator />
                            <Link to="/settings">Setting</Link>
                            <Separator />
                            <Link to={`/user/${userInfo.username}`}>{userInfo.username}</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Sign in</Link>
                            <Separator />
                            <Link to="/register">Sign up</Link>
                        </>
                    )}
                </div>
            </header>

            <Switch>
                <Route path={["/register", "/login"]} component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/article/:id" component={Article} />
                <Route path={["/editor/:id", "/editor"]} component={EditArtcle} />
                <Route path="/settings" component={Profile} />
                <Route path={["/user/:username/:tab", "/user/:username"]} component={User} />
                <Redirect from="/" to="/home" />
            </Switch>

            {footer}
        </div>
    );
}

export default App;
