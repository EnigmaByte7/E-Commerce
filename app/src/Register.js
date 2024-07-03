import React from 'react'
import styles from './login_styles.module.css'
import {useState} from 'react'
import signup from './signup.png'

export default function Register() { 
        const [form, setForm] = useState({name:'', pass:'', email:''});
        const handleChange = (e)=>{
            setForm({...form, [e.target.name] : e.target.value});
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: form.name, email: form.email, password: form.pass }),
                });
                const data = await response.json();
                throw(data.message || data.error);
            } catch (err) {
                throw(err);
            }
        };

        return (
        <div className={styles.main}>
        <div className={styles.banner_img}><img src={signup} alt='hero-image'></img></div>
        <div className={styles.form_container}>
            <div className={styles.form}>
            <div className={styles.login_text}>
                <div className={styles.wel}>Welcome</div>
                <div className={styles.bk}>to Family</div>
            </div>
                <form action='/login' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input autoFocus autoComplete='off' className={styles.inpt3} type='text' id='name' name='name' value={form.name} onChange={handleChange} required></input>
                    <label htmlFor='mail'>Email</label>
                    <input autoFocus autoComplete='off' className={styles.inpt1} type='email' id='mail' name='email' value={form.email} onChange={handleChange} required></input>
                    <label htmlFor='pswd'>Password</label>
                    <input autoComplete='off' className={styles.inpt2} type='password' name='pass' id='pswd' value={form.pass} onChange={handleChange} required></input>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
        </div>
    )
}
