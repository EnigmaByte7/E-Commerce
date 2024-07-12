import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ddog from './ddog.png';
import fail from './fail.json';
import Lottie from 'lottie-react';
import styles from './status_styles.module.css';
import {motion} from 'framer-motion'

export default function Success() {
    const [key, setKey] = useState(localStorage.getItem('key'));
    const [user, setUser] = useState(localStorage.getItem('userid'));
    return (
        <>
            {(user===null || user===undefined) || (key===null) ? (
                <div className={styles.empty}>
                    <div className={styles.logg}>Nothing to See Here!</div>
                    <img src={ddog} alt='loggedout' />
                </div>
            ) : (
                <div className={styles.fwindow}>
                    <Lottie className={styles.fail} animationData={fail} loop={false} />
                    <div className={styles.ftitle}>Oops! Something Went Wrong</div>
                    <div className={styles.btn}><Link to='/checkout'><motion.button className={styles.shop_btn} type='button'>Try Again</motion.button></Link></div>
                </div>
            )}
        </>
    );
}
