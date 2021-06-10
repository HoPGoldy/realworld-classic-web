import { Link } from 'react-router-dom';
import mergeQuery from '@/plugins/mergeQuery';

/** 分页组件 */
const Pagination = function (props) {
    const { total, size = 10 } = props;

    const maxPage = Math.ceil(total / size);
    // 根据当前分页和最大数量确定有多少页，并渲染对应的 link
    return Array(maxPage).fill().map((_, index) => (
        <span key={index}>
            &nbsp;
            <Link to={location => {
                return `${location.pathname}?${mergeQuery({ page: index })}`
            }}>{index + 1}</Link>
            &nbsp;
        </span>
    ));
}

export default Pagination;