import { Link } from 'react-router-dom';

/**
 * 渲染指定 tag
 * @param {string} tag 要显示的内容
 */
const Tag = function (tag) {
    return (
        <span key={tag}>
            &nbsp;<Link to={{ pathname: '/home', search: `?tag=${tag}` }}>{tag}</Link>&nbsp;
        </span>
    )
}

export default Tag;