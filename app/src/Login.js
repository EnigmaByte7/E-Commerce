import React from 'react'
import styles from './login_styles.module.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import banner from './login.png'

export default function Login() {
    const [form, setForm] = useState({name:'', pass:'', email:''});
    const handleChange = (e)=>{
        setForm({...form, [e.target.name] : e.target.value});
    }
    return (
        <div className={styles.main}>
        <div className={styles.banner_img}><img src={banner} alt='hero-image'></img></div>
        <div className={styles.form_container}>
            <div className={styles.form}>
            <div className={styles.login_text}>
                <div className={styles.wel}>Welcome</div>
                <div className={styles.bk}>back</div>
            </div>
                <form action='/login'>
                    <label htmlFor='mail'>Email</label>
                    <input autoFocus autoComplete='off' className={styles.inpt1} type='email' id='mail' name='email' value={form.email} onChange={handleChange} required></input>
                    <label htmlFor='pswd'>Password</label>
                    <input autoComplete='off' className={styles.inpt2} type='password' name='pass' id='pswd' value={form.pass} onChange={handleChange} required></input>
                    <div className='create_acc'>Don't have an account ? <Link to='/register'>Sign up now.</Link></div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
        </div>
  )
}
