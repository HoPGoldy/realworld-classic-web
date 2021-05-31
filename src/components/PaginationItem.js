import { Link } from 'react-router-dom';

const PaginationItem = function ({ page }) {
    const to = { search: `?page=${page}` }
    return (
        <>&nbsp;<Link key={page} to={to}>{page}</Link>&nbsp;</>
    )
}

const Pagination = function (props) {
    const { current, total, size = 20, onClick } = props;

    const maxPage = Math.ceil(total / size);
    return Array(maxPage).fill().map((_, index) => <PaginationItem page={index + 1}/>)
}

export default Pagination;