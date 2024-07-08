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
  const id = localStorage.getItem('userid');
  const [user, setUser] = useState(name);  
  const [cart, setCart] = useState(undefined);

  useEffect(()=>{
  const fetchCartDetails = async (id)=>{
    try{
      const response = await fetch('http://localhost:5000/api/users/getlen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({  id:id }),
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

  if(id)
    fetchCartDetails(id);
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
      <img className='hero-img' src={hero} alt='main'></img>
      <Navbar user={user} setUser={setUser} cart={cart}/>
      <div className='moto'>
        <div className='moto-text'>Decorate Your Dream Space <br/> With Our Finest Collection</div>
        <Link to='/products/sofa' ><button className='explore'>Explore Collection</button></Link>
      </div>
    </div>
    </>
  )
}

const Navbar = ({user, setUser,cart})=>{
  const navigate = useNavigate();
  const handleClick = (e)=>{
    e.preventDefault();
    if(user != null){
      localStorage.clear();
      navigate('/'); 
      toast.success('Logged Out!')  
      setUser(undefined);
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
            <div className='bag'>
            <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
            <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
        </div>
    </div>
  )
}
