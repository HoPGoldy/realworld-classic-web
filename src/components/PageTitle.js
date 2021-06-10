/** 全局的淡蓝色标题 */
const PageTitle = function ({ title, summary }) {
    // 简介可以自定义渲染
    const summaryContent = !summary ? null :
        <p>{typeof summary === 'function' ? summary() : summary}</p>;

    return (
        <div className="page-part">
            <h1>{title}</h1>
            {summaryContent}
        </div>
    )
}

export default PageTitle;