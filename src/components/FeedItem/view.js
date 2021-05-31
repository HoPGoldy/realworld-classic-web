import renderTag from '@/components/renderTag';

const FeedItem = function (props) {
    // console.log('🚀 ~ file: view.js ~ line 4 ~ FeedItem ~ props', props)
    const { title, author, timeLabel, body, tagList } = props;

    return (
        <li>
            <div>
                <h2>{title}</h2>
            </div>

            <ul>
                <li>
                    <b>Author:</b> {author.username}&nbsp;
                    <a href={author.image} target="__blank" title="see avatar">☻</a>
                </li>

                <li><b>Update at:</b> {timeLabel}</li>

                {tagList && tagList.length > 0 && <li>
                    <b>Tag:</b> {tagList.map(renderTag)}
                </li>}
            </ul>

            <p>{body}</p>
        </li>
    );
}

export default FeedItem;