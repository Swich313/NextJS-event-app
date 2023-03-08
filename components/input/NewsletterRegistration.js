import {useState, useEffect, useContext } from 'react';

import isEmail from '../../utils/validattion-util';
import NotificationContext from "@/store/notification-context";

import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {
    const [isValid, setIsValid] = useState(false);
    const [email, setEmail] = useState('');
    const [isBlur, setIsBlur] = useState(false);
    const notificationCtx = useContext(NotificationContext);

    useEffect(() => {
        if(!email && !isBlur){
            console.log('No Email yet');
            setIsValid(true);
        }else if(!email && isBlur){
            console.log('No Email');
            setIsValid(false);
        }else if(!isEmail(email)){
            console.log('Email is invalid!');
            setIsValid(false);
        } else {
            setIsValid(true)
            console.log('Valid email!')
            setIsBlur(false);
        }
    }, [email, isBlur]);

    async function registrationHandler(event) {
        event.preventDefault();
        try {
            notificationCtx.showNotification({
                title: 'Signing up...',
                message: 'Registering for newsletter!',
                status: 'pending'
            })
            const res = await fetch('/api/newsletter/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
            });
            const response = await res.json();

            if(res.ok){
                // if(response.ok){
                setEmail('');
                setIsBlur(false);
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Successfully registered for newsletter!',
                    status: 'success'
                })
                // }
            } else {
                throw new Error(response.message || 'Something went wrong!')
            }

        } catch (err) {
            notificationCtx.showNotification({
                title: 'Error!',
                message: err.message || 'Something went wrong!',
                status: 'error'
            })
            }
        }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                        onBlur={() => setIsBlur(true)}
                    />
                    <button disabled={!isValid}>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;