const PageTitle = function ({ title, summary }) {
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