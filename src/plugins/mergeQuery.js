import Qs from 'qs';

const mergeQuery = function (newQuery) {
    const query = {
        ...Qs.parse(window.location.search, { ignoreQueryPrefix: true }),
        ...newQuery
    }
    return Qs.stringify(query)
}

export default mergeQuery;