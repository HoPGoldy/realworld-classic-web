import './styles.css';

const PageTitle = function ({ title, summary }) {
    return (
        <div className="big-title">
            <h1>{title}</h1>
            {summary && <p>{summary}</p>}
        </div>
    )
}

export default PageTitle;