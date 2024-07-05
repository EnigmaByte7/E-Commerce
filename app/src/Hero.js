import React, { useEffect ,useState} from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import hero from './hero3.png'
import logout from './logout.png'
import './index.css';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate,Link } from 'react-router-dom';


export default function Hero() {
  const name = localStorage.getItem('user');
  const [user, setUser] = useState(name);  
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
      <img className='hero-img' src={hero} alt='main'></img>
      <Navbar user={user} setUser={setUser} />
      <div className='moto'>
        <div className='moto-text'>Decorate Your Dream Space <br/> With Our Finest Collection</div>
        <Link to='/products/sofa' ><button className='explore'>Explore Collection</button></Link>
      </div>
    </div>
    </>
  )
}



const Navbar = ({user, setUser})=>{
  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    if(user != null){
      localStorage.removeItem('user');
      navigate('/');
      localStorage.setItem('greeted','no')     
      setUser(undefined);
      toast.success('Logged Out!')
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
            <div className='abt'>About</div>
        </div>
        <div className='icons'>
            <img src={bag} alt='bag' id='cart'></img>
            <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
        </div>
    </div>
  )
}
