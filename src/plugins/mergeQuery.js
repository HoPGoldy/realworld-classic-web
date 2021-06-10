import Qs from 'qs';

/**
 * 将新的查询字段合并到当前的 url queryString 并返回对应字符串
 */
const mergeQuery = function (newQuery) {
    const query = {
        ...Qs.parse(window.location.search, { ignoreQueryPrefix: true }),
        ...newQuery
    }
    return Qs.stringify(query)
}

export default mergeQuery;