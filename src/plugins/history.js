import { createHashHistory } from 'history';

const history = createHashHistory();

/**
 * 根据当前页面状态跳转页面标题
 */
const changeTitle = location => {
    const pageTitle = location.pathname.split('/').join(' ');
    document.title = `${pageTitle} —— Conduit`;
}

history.listen(changeTitle);
changeTitle(window.location);

export default history;