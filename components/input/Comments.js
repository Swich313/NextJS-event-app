import {useEffect, useState, useContexton, useContext} from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import NotificationContext from "@/store/notification-context";

import classes from './Comments.module.css';

function Comments(props) {
    const { eventId } = props;
    const notificationCtx = useContext(NotificationContext);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
console.log(notificationCtx);

    useEffect(() => {
        if (showComments) {
            notificationCtx.showNotification({
                title: 'Sending comments...',
                message: 'Your comments!',
                status: 'pending'
            });
            fetch(`/api/comments/${eventId}`)
                .then((response) => {
                    const res = response.json();
                    if(response.ok){
                        notificationCtx.showNotification({
                            title: 'Success!',
                            message: 'Successfully registered comment!',
                            status: 'success'
                        })
                        // return response.json()
                    }
                    return res;
                })
                .then((data) => {
                    if (!data?.ok){
                        console.log(data)
                        throw new Error (data.message || 'Something went wrong!')
                    }
                    setComments(data.comments);
                    setIsCreated(false)
                }).catch(err => {
                notificationCtx.showNotification({
                    title: 'Error!',
                    message: err.message || 'Something went wrong',
                    status: 'error'
                })
            });
        }
    }, [showComments, isCreated]);

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData) {
       return fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
    }

    function addCommentFulfilledHandler(response){
        if(response.ok){
            setIsCreated(response.ok);
        }
        return;
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} onAddCommentFulfilled={addCommentFulfilledHandler}/>}
            {notificationCtx.notification?.status === 'pending' && <div>Loading...</div>}
            {showComments && <CommentList items={comments} />}
        </section>
    );
}

export default Comments;