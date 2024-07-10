import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ddog from './ddog.png';
import success from './success.json';
import { Lottie } from 'lottie-react';
import styles from './status_styles.module.css';

export default function Success() {
    const [key, setKey] = useState(localStorage.getItem('key'));
    const [user, setUser] = useState(localStorage.getItem('userid'));

    useEffect(()=>{
        const clearCart = async function () {
            try {
                const response = await fetch('http://localhost:5000/api/users/clrcart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid: user })
                });
                if (response.ok) {
                    console.log('ok');
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    if(user)
        clearCart();
},[]);

    return (
        <>
            {(!user && key) ? (
                <div className={styles.empty}>
                    <img src={ddog} alt='loggedout' />
                    <div className={styles.logg}>Nothing to See Here!</div>
                </div>
            ) : (
                <div className={styles.window}>
                    <Lottie animationData={success} loop={false} />
                    <div className={styles.title}>Order Placed!</div>
                </div>
            )}
        </>
    );
}
