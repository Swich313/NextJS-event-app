import classes from './CommentList.module.css';

function CommentList(props) {
    const { items } = props;
    let comments;

    if(items || items?.length > 0){
         comments = items.map((item) => (
            <li key={item._id}>
                <p>{item.comment}</p>
                <div>
                    By <address>{item.name}</address>
                </div>
            </li>
        ))
    } else {
         comments = (<div>No comments</div>);
    }

    return (
        <ul className={classes.comments}>
            {comments}
        </ul>
    );
}

export default CommentList;