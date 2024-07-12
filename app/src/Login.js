import React from 'react'
import styles from './login_styles.module.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import banner from './login.png'
import {useRef} from 'react'
import loader from './loader.gif'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

export default function Login() {
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const loadRef = useRef(null);
    const user = null;
    const [form, setForm] = useState({ pass:'', email:''});
    const handleChange = (e)=>{
        setForm({...form, [e.target.name] : e.target.value});
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        buttonRef.current.style.visibility = 'hidden';
        loadRef.current.style.visibility = 'visible';
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  email: form.email, password: form.pass }),
            });
            const data = await response.json();
            if(response.ok && user === null)
            {
                toast.success('Logged In Successfully',{
                    duration:1500,
                    position:'top-center'
                })
                buttonRef.current.style.visibility = 'visible';
                loadRef.current.style.visibility = 'hidden';
                localStorage.setItem('user',data.username);
                localStorage.setItem('userid',data.id);
                setTimeout(()=>{
                    navigate('/');
                },2000);
            }
            if(!response.ok){
                toast.error(`${data.message}`)
                buttonRef.current.style.visibility = 'visible';
                loadRef.current.style.visibility = 'hidden';
            }
        } catch (err) {
            throw(err);
        }
    };

    return (
        <div className={styles.main}>
        <Toaster />
        <div className={styles.banner_img}><img src={banner} alt='hero-image'></img></div>
        <div className={styles.form_container}>
            <div className={styles.form}>
            <div className={styles.login_text}>
                <div className={styles.wel}>Welcome</div>
                <div className={styles.bk}>back</div>
            </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='mail'>Email</label>
                    <input autoFocus autoComplete='off' className={styles.inpt1} type='email' id='mail' name='email' value={form.email} onChange={handleChange} required></input>
                    <label htmlFor='pswd'>Password</label>
                    <input autoComplete='off' className={styles.inpt2} type='password' name='pass' id='pswd' value={form.pass} onChange={handleChange} required></input>
                    <div className='create_acc'>Don't have an account ? <Link to='/register'>Sign up now.</Link></div>
                    <motion.button ref={buttonRef} whileHover={{scale:1.03}} whileTap={{scale:0.95}}  type='submit'>Login</motion.button>
                    <div ref={loadRef} className={styles.loader}><img src={loader} alt='loading'></img></div>
                </form>
            </div>
        </div>
        </div>
  )
}
