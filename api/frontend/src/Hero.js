import React, { useEffect ,useState} from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import hero from './hero3.png'
import logout from './logout.png'
import './index.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate,Link } from 'react-router-dom';
import favob from './favob.png'
import favo from './favo.png'
import box from './box.png'
import {motion} from 'framer-motion'

export default function Hero() {
  const name = localStorage.getItem('user');
  const id = localStorage.getItem('userid');
  const [user, setUser] = useState(name);  
  const [cart, setCart] = useState(undefined);
  const [fav, setFav] = useState(0);

  useEffect(()=>{    const fetchFavData = async (id) => {
    try {
        const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/getfav', {
            method : 'POST',
            headers: {
              'Content-type' : 'application/json',
            },
            body: JSON.stringify({userid : id}),
          });
        const data = await response.json();
        if (response.ok) {
            setFav(data.fav.length);
            
        } else {
            console.log(data.message);
        }
    } catch (err) {
        console.log(err);
    }
  }
  const fetchCartDetails = async (userid)=>{
    try{
      const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/getlen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  userid:userid }),
    });
    const data = await response.json();
    if(response.ok){
      setCart(data.length)
    }
    else{
      console.log('err');
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  if(id){
    fetchCartDetails(id);
    fetchFavData(id);
  }
})

  useEffect(()=>{  
    const greet = localStorage.getItem('greeted');
    setTimeout(()=>{
      if(user && greet!=='yes'){
        toast.success(`Hello! ${name} 👋 `,{
          duration:3000
      });
      localStorage.setItem('greeted','yes')     
      }
    },1000)
  },[])

  return (
    <>
    <Toaster />
    <div className='Hero-container'>
      <motion.img initial={{scale:1.1}} animate={{scale:1}} transition={{duration:2}} className='hero-img' src={hero} alt='main'></motion.img>
      <Navbar fav={fav} setFav={setFav} user={user} setUser={setUser} cart={cart}/>
      <div className='moto'>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:3}}  className='moto-text'>Decorate Your Dream Space <br/> With Our Finest Collection</motion.div>
        <Link to='/products/sofa' ><motion.button whileHover={{scale:1.03}} whileTap={{scale:0.95}} className='explore'>Explore Collection</motion.button></Link>
      </div>
    </div>
    </>
  )
}

const Navbar = ({user, setUser,cart, fav, setFav})=>{
  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    if(user != null || user != undefined){
      localStorage.clear();
      navigate('/'); 
      toast.success('Logged Out!')  
      setUser(undefined);
      setFav(0);
    } 
    else{
      navigate('/login');
    }
  }
  return (
    <div className='navbar'>
        <div className='logo'>Oak & Ivory</div>
        <div className='tabs'>
            <Link to='/'><div className='home'>Home</div></Link>
            <Link to='/products/sofa' ><div className='collect'>Collections</div></Link>
            <Link to='/about'><div className='abt'>About</div></Link>
        </div>
        <div className='icons'>
            <div><Link to='/orders'><img src={box} alt='bag' id='box'></img></Link></div>
            <div><Link to='/favorites'><img src={(user && fav > 0) ? favo : favob} alt='bag' id='cart'></img></Link></div>
            <div className='bag'>
            <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
            <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
        </div>
    </div>
  )
}
