import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ddog from './ddog.png';
import success from './success.json';
import Lottie from 'lottie-react';
import styles from './status_styles.module.css';
import {motion} from 'framer-motion'

export default function Success() {
    const [key, setKey] = useState(localStorage.getItem('key'));
    const [user, setUser] = useState(localStorage.getItem('userid'));

    console.log(key)
    useEffect(() => {
        return () => {
            localStorage.removeItem('key');
            setKey(undefined);
        };
    }, []);


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
            {(user===null || user===undefined )|| (key===null) ? (
                <div className={styles.empty}>
                    <div className={styles.logg}>Nothing to See Here!</div>
                    <img src={ddog} alt='loggedout' />
                </div>
            ) : (
                <div className={styles.window}>
                    <Lottie animationData={success} loop={false} />
                    <div className={styles.title}>Order Placed!</div>
                    <div className={styles.btn}><Link to='/'><motion.button className={styles.shop_btn} whileHover={{scale:1.03}} whileTap={{scale:0.95}}  type='button'>Continue Shopping</motion.button></Link></div>
                </div>
            )}
        </>
    );
}
