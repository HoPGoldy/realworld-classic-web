/** 回显 api 接口返回的错误信息（校验失败信息） */
const ApiError = function (props) {
    // 这个 errorMsg 应该是个对象
    const { errorMsg } = props;
    if (!errorMsg || Object.keys(errorMsg).length <= 0) return null;
    
    // 遍历对象，把每个键值对渲染成一行
    const messageList = Object.entries(errorMsg).map(line => line.join(' '));
    return messageList.map(error => {
        return <div className="error" key={error}>{error}</div>
    });
}

export default ApiError;