import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';

export default function Cart() {
    const name = localStorage.getItem('user');
    const id = localStorage.getItem('userid');
    const [user, setUser] = useState(name);  
    const [cart, setCart] = useState(undefined);
    useEffect(()=>{
    const fetchCartLength= async (id)=>{
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
        fetchCartLength(id);
    })
    
    return (
    <div>
        <Toaster />
        <Navbar user={user} setUser={setUser} cart={cart}/>
    </div>
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
        <div className='navbar1'>
            <div className='logo'>Oak & Ivory</div>
            <div className='tabs'>
                <Link to='/'><div className='home'>Home</div></Link>
                <Link to='/products/sofa' ><div className='collect'>Collections</div></Link>
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
            <div className='bag'>
              <img src={bag} alt='bag' id='cart'></img>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
                <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
    )
  }