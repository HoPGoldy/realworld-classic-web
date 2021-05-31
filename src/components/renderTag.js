import { Link } from 'react-router-dom';

const renderTag = function (tag) {
    const to = {
        pathname: '/home',
        search: `?tag=${tag}`
    }
    return (
        <>
            <Link key={tag} to={to}>{tag}</Link>
            &nbsp;&nbsp;
        </>
    )
}

export default renderTag;