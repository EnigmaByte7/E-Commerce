import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './cart_style.module.css'

export default function Cart() {
    const name = localStorage.getItem('user');
    const id = localStorage.getItem('userid');
    const [user, setUser] = useState(name);  
    const [cartlen, setCartLen] = useState(undefined);
    const [cart, setCart] = useState(undefined);
    useEffect(()=>{
    const fetchCartData= async (id)=>{
        try{
        const response = await fetch('http://localhost:5000/api/users/getcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  id:id }),
        });
        const data = await response.json();
        if(response.ok){
            setCart(data.cart);
            setCartLen(data.cart.length);
        }
        else{
            console.log(data.message);
        }
    }
        catch(err)
        {
        console.log(err);
        }
    }

    if(id)
        fetchCartData(id);
    },[])
    
    console.log(cart);
    console.log(cartlen);
    return (
    <div>
        <Toaster />
        <Navbar user={user} setUser={setUser} cart={cartlen}/>
        <div className={styles.main}>
            <div className={styles.cart}>
                <div className={styles.cart_title}>
                    Shopping Cart
                </div>
                <div className={styles.main_cart}>
                    <div className={styles.product_list}>
                        <div className={styles.head}>
                            <div className={styles.product}>Product</div>
                            <div className={styles.price}>Price</div>
                            <div className={styles.qty}>Quantity</div>
                            <div className={styles.tprice}>Total Price</div>
                        </div>
                        {
                            cart &&
                            cart.map((item) => {
                                const {name, price, image_url, quantity, id} = item;
                                const props = {name, price, image_url, quantity,id};
                                return(
                                    <Product props={props} key={props.id} />
                                )
                            })
                        }
                    </div>
                    <div className={styles.total}>
                        <div className={styles.total_section}>
                            <div className={styles.row}><div className={styles.cart_t}>Cart Total</div></div>
                            <div className={styles.row}>
                                <div className={styles.first}>Subtotal</div>
                                <div className={styles.second}>price</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.first}>Shipping</div>
                                <div className={styles.second}>price</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.first}>Tax</div>
                                <div className={styles.second}>price</div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.first}>Total</div>
                                <div className={styles.second}>price</div>
                            </div>
                            <div className={styles.btn}>
                                <button type='button'>Proceed to Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

const Product = (props)=>{
    const obj = props.props;
    return (
        <div className={styles.product_snip}>
            <div className={styles.img_cont}>
                <img src={obj.image_url} alt='pro-img'></img>
            </div>
            <div className={styles.name_section}>
                <div className={styles.title}>{obj.name}</div>
                <div className={styles.brand}>by Homestead</div>
            </div>
            <div className={styles.price_section}>{obj.price}</div>
            <div className={styles.qty_controller}>
                <div className={styles.dec}>-</div>
                <div className={styles.window}>{obj.quantity}</div>
                <div className={styles.inc}>+</div>
            </div>
            <div className={styles.total_sum}>100</div>
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
        <div className={styles.navbar2}>
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