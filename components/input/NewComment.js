import { useRef, useState, useContext } from 'react';

import isEmail from '../../utils/validattion-util';
import NotificationContext from "@/store/notification-context";

import classes from './NewComment.module.css';

function NewComment(props) {
    const [isInvalid, setIsInvalid] = useState(false);
    const { onAddComment, onAddCommentFulfilled} = props;
    const notificationCtx = useContext(NotificationContext);

    const emailInputRef = useRef();
    const nameInputRef = useRef();
    const commentInputRef = useRef();

    async function sendCommentHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredComment = commentInputRef.current.value;

        if (
            !isEmail(enteredEmail) ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }
        try {
            notificationCtx.showNotification({
                title: 'Sending comments...',
                message: 'Your comments!',
                status: 'pending'
            })
            const response = await  onAddComment({
                email: enteredEmail,
                name: enteredName,
                comment: enteredComment,
            });
            if(response.ok){
                emailInputRef.current.value = '';
                nameInputRef.current.value = '';
                commentInputRef.current.value = '';
                setIsInvalid(false);
                onAddCommentFulfilled(response);

                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully registered comment!',
                    status: 'success'
                })
            } else {
                throw new Error (response.message || 'Something went wrong!')
            }
        } catch (e) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: e.message || 'Something went wrong',
                status: 'error'
            })
        }
        // onAddComment({
        //     email: enteredEmail,
        //     name: enteredName,
        //     comment: enteredComment,
        // }).then(response => {
        //     console.log(response);
        //     if(response.ok){
        //         emailInputRef.current.value = '';
        //         nameInputRef.current.value = '';
        //         commentInputRef.current.value = '';
        //         onAddCommentFulfilled(response);
        //     }
        // })


    }

    return (
        <form className={classes.form} onSubmit={sendCommentHandler}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your email</label>
                    <input type='email' id='email' ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor='comment'>Your comment</label>
                <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
            </div>
            {isInvalid && <p className={classes.invalid}>Please enter a valid email address and comment!</p>}
            <button className={classes.btn} disabled={isInvalid}>Submit</button>
        </form>
    );
}

export default NewComment;