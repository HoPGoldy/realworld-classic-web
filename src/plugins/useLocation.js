import { useLocation as useOriginLocation } from 'react-router-dom';
import Qs from 'qs';

/**
 * 自定义 location
 * 在原始 location 的基础上将 search 字符串解析为 query 对象
 */
const useLocation = function () {
    const location = useOriginLocation();
    return { ...location, query: Qs.parse(location.search, { ignoreQueryPrefix: true }) }
}

export default useLocation;