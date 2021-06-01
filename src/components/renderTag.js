import { Link } from 'react-router-dom';

/**
 * 渲染指定 tag
 * @param {string} tag 要显示的内容
 */
const renderTag = function (tag) {
    const to = { pathname: '/home', search: `?tag=${tag}` };

    return (
        <span key={tag}>
            &nbsp;<Link to={to}>{tag}</Link>&nbsp;
        </span>
    )
}

export default renderTag;