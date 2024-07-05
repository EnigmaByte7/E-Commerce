import React from 'react'
import styles from './login_styles.module.css'
import {useState} from 'react'
import signup from './signup.png'
import {useRef} from 'react'
import loader from './loader.gif'
import {Link} from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
        const navigate = useNavigate();
        const buttonRef = useRef(null);
        const loadRef = useRef(null);
        const [form, setForm] = useState({name:'', pass:'', email:''});
        const handleChange = (e)=>{
            setForm({...form, [e.target.name] : e.target.value});
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            buttonRef.current.style.visibility = 'hidden';
            loadRef.current.style.visibility = 'visible';
            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: form.name, email: form.email, password: form.pass }),
                });
                const data = await response.json();
                if(response.ok)
                {
                    toast.success('Signed Up Successfully',{
                        duration:1500,
                        position:'top-center'
                    })
                    buttonRef.current.style.visibility = 'visible';
                    loadRef.current.style.visibility = 'hidden';
                    setTimeout(()=>{
                        navigate('/login');
                    },2000);
                }
                if(!response.ok){
                    console.log(data.message);
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
                    <input  autoComplete='off' className={styles.inpt1} type='email' id='mail' name='email' value={form.email} onChange={handleChange} required></input>
                    <label htmlFor='pswd'>Password</label>
                    <input autoComplete='off' className={styles.inpt2} type='password' name='pass' id='pswd' value={form.pass} onChange={handleChange} required></input>
                    <div className='create_acc'>Already have an account ? <Link to='/login'>Login now.</Link></div>
                    <button ref={buttonRef} type='submit'>Sign Up</button>
                    <div ref={loadRef} className={styles.loader}><img src={loader} alt='loading'></img></div>
                </form>
            </div>
        </div>
        </div>
    )
}
