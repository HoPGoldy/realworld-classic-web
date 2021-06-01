import { Link } from 'react-router-dom';
import mergeQuery from '@/components/mergeQuery';

const Pagination = function (props) {
    const { total, size = 10 } = props;

    const maxPage = Math.ceil(total / size);
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