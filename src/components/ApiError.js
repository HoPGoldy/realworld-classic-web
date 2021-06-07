const ApiError = function (props) {
    const { errorMsg } = props;
    if (!errorMsg || Object.keys(errorMsg).length <= 0) return null;
    
    const messageList = Object.entries(errorMsg).map(line => line.join(' '));
    return messageList.map(error => {
        return <div className="error" key={error}>{error}</div>
    });
}

export default ApiError;