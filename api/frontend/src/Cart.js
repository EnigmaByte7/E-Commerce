import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './cart_style.module.css'
import mpt from './mpt.png'
import favob from './favob.png'
import favo from './favo.png'
import box from './box.png'
import {motion} from 'framer-motion'
let id;
let name;
export default function Cart() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [cartLen, setCartLen] = useState(0);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [fav, setFav] = useState(0);

    const fetchFavData = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/getfav', {
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


    const fetchCartData = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/getcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: id }),
            });
            const data = await response.json();
            if (response.ok) {
                setCart(data.cart);
                setCartLen(data.cart.length);
                const calculatedTotal = data.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
                setTotal(calculatedTotal);
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const setKey = ()=>{
        localStorage.setItem('key','initiated');
    }

    useEffect(() => {
        id = localStorage.getItem('userid');
        if (id) {
            fetchCartData(id);
            fetchFavData(id);
        }
    }, []);

    useEffect(() => {
        name = localStorage.getItem('user');
        setUser(name);
    }, []);

    
    console.log(id);
    console.log(name)
    console.log(user)
    console.log(cart);
    console.log(cartLen);

    return (
        <div>
            <Toaster />
            <Navbar user={user} setUser={setUser} cart={cartLen} setcart={setCart} fav={fav} setFav={setFav}/>
            {user === null || user === undefined ? (
                <div className={styles.empty}>
                    <img src='https://cdn.pixabay.com/photo/2012/05/07/13/32/black-48472_640.png' alt='loggedout' />
                    <div className={styles.logg}>Please Login to Continue!</div>
                </div>
            ) : cartLen === 0 ? (
                <div className={styles.empty}>
                    <img src={mpt} alt='Empty Cart' />
                    <div className={styles.empty_text}>Oops! Your Cart is Empty.</div>
                </div>
            ) : (
                <div className={styles.cart}>
                    <div className={styles.cart_title}>Shopping Cart</div>
                    <div className={styles.main_cart}>
                        <div className={styles.product_list}>
                            <div className={styles.head}>
                                <div className={styles.product}>Product</div>
                                <div className={styles.price}>Price</div>
                                <div className={styles.qty}>Quantity</div>
                                <div className={styles.tprice}>Total Price</div>
                            </div>
                            {cart &&
                                cart.map((item) => {
                                    const { name, price, image_url, quantity, id,brand } = item;
                                    const props = { name, price, image_url, quantity, id,brand };
                                    return <Product props={props} key={props.id} fetchCartData={fetchCartData} />;
                                })}
                        </div>
                        <div className={styles.total}>
                            <div className={styles.total_section}>
                                <div className={styles.row1}>
                                    <div className={styles.cart_t}>Cart Total</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.first}>Subtotal</div>
                                    <div className={styles.second}>₹{total}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.first}>Shipping</div>
                                    <div className={styles.second}>₹{(total * 5) / 100}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.first}>Tax</div>
                                    <div className={styles.second}>₹{(total * 6) / 100}</div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.firstfinal}>Total</div>
                                    <div className={styles.secondfinal}>₹{(total * 5) / 100 + (total * 6) / 100 + total}</div>
                                </div>
                                <div className={styles.btn}>
                                    <Link to='/checkout' ><motion.button whileHover={{scale:1.03}} whileTap={{scale:0.95}}  onClick={setKey} type='button'>Proceed to Checkout</motion.button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
const Product = ({ props, fetchCartData }) => {
    const { name, price, image_url, quantity,brand } = props;

    const inc = async (name) => {
        console.log(name)
        try {
            const response = await fetch('http://localhost:5000/api/users/inc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: id, name: name }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchCartData(id);
                if (data.message === 'limit') {
                    toast.error('Purchase is limited to 6 units per item');
                }
                fetchCartData(id);
            }
        } catch (err) {
            fetchCartData(id);
            console.log(err);
        }
    };

    const dec = async (name) => {
        try {
            const response = await fetch('http://localhost:5000/api/users/dec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: id, name: name }),
            });
            const data = await response.json();
            if (response.ok) {
                fetchCartData(id);
                console.log(data.message);
            }
            fetchCartData(id);
        } catch (err) {
            fetchCartData(id);
            console.log(err);
        }
    };

    return (
        <div className={styles.product_snip}>
            <div className={styles.img_cont}>
                <img src={image_url} alt='pro-img'></img>
            </div>
            <div className={styles.name_section}>
                <div className={styles.title}>{name}</div>
                <div className={styles.brand}>by {brand}</div>
            </div>
            <div className={styles.price_section}>₹{price}</div>
            <div className={styles.qty_controller}>
                <div onClick={()=> dec({name})} className={styles.dec}>-</div>
                <div className={styles.window}>{quantity}</div>
                <div onClick={()=> inc({name})} className={styles.inc}>+</div>
            </div>
            <div className={styles.total_sum}>₹ {(price * quantity)}</div>
        </div>
    )
}

const Navbar = ({user, setUser,cart,setcart, fav, setFav})=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            localStorage.clear();
            setUser(null);
            setcart([]);
            setIsLoggingOut(true);
            setFav(0);
            toast.success('Logged Out!');
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (isLoggingOut && !user) {
            navigate('/');
            setIsLoggingOut(false);
        }
    }, [isLoggingOut, user, navigate]);

    

    return (
        <div className={styles.navbar2}>
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