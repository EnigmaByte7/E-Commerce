import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './check_styles.module.css'
import favob from './favob.png'
import favo from './favo.png'
import upi from './upi.png'
import cod from './cod.png'
import loader from './loader.gif'
import card from './card.png'
import dog from './dog.png'

let id;
let name;
export default function Checkout() {
    const [user, setUser] = useState(localStorage.getItem('userid'));
    const [cartLen, setCartLen] = useState(0);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [fav, setFav] = useState(0);
    const navigate = useNavigate();
    const [order, setOrder] = useState({name:'', add:'',state:'', city:'', zip:'',pay:''});
    const [key, setKey] = useState(localStorage.getItem('key'));
    const [loading, setLoading] = useState(false);

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

    const handleCheckout = async ()=>{
        setLoading(true);
        try{
            const response = await fetch('http://localhost:5000/api/users/crtorder',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order:order, userid:id}),
            });
            const data = await response.json();
            if(response.ok && data.message === 'success')
            {
                navigate('/success')
            }
            else{
                navigate('/failed')
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setOrder((prevOrder) => ({
            ...prevOrder,
            [name]:value
        }) )
    }

    const handleMethod = (method) =>{
        setOrder((prevOrder) => ({
            ...prevOrder,
            pay:method
        }))
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
    console.log(order);
    return (
        <div>
            <Toaster />
            <Navbar setKey={setKey} user={user} setUser={setUser} cart={cartLen} setcart={setCart} fav={fav} setFav={setFav}/>
            {(user === null || user === undefined) && key ? (
                <div className={styles.empty}>
                    <img src={dog} alt='loggedout' />
                    <div className={styles.logg}>Nothing to See Here!</div>
                </div>
            ) :  (
                <div className={styles.cart}>
                    <div className={styles.cart_title}>Checkout</div>
                    <div className={styles.main_cart}>
                        <div className={styles.product_list}>
                            {cart &&
                                cart.map((item) => {
                                    const { name, price, image_url, quantity, id } = item;
                                    const props = { name, price, image_url, quantity, id };
                                    return <Product props={props} key={props.id} fetchCartData={fetchCartData} />;
                                })}
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
                                    <div className={styles.firstfinal}>Total Due</div>
                                    <div className={styles.secondfinal}>₹{(total * 5) / 100 + (total * 6) / 100 + total}</div>
                                </div>
                            </div>
                        </div>
                            </div>
                        <div className={styles.product_list}>
                            <div className={styles.product_snip1}>
                                <div className={styles.ship}>
                                    <div className={styles.heading}>Shipping Information</div>
                                    <div className={styles.ship_form}>
                                    <form className={styles.checkoutForm}>
                                        <div className={styles.formGroup}>
                                            <input autoComplete='off' required type="text" id="fullName" onChange={handleChange} placeholder='Full Name' value={order.name} name="name" className={styles.formControl} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <input autoComplete='off' required  type="text" id="add" placeholder='Address' onChange={handleChange}  value={order.add} name="address" className={styles.formControl} />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <input autoComplete='off'  required type="text" id="state" name="state" placeholder='State' onChange={handleChange} value={order.state} className={styles.formControl} />
                                        </div>
                                        <div className={styles.formGrouplast}>
                                            <input  autoComplete='off' required type="text" id="city" name="city" placeholder='City' onChange={handleChange}  value={order.city} className={styles.formControl} />
                                            <input autoComplete='off'  required type="number" id="postalCode" name="zip" placeholder='Postal Code' onChange={handleChange} value={order.zip} className={styles.formControl} />
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div><div className={styles.ship}>
                                    <div className={styles.heading}>Payment Mode</div>
                                    <div className={styles.pay_form}>
                                    <form className={styles.payoutForm}>
                                        <div onClick={()=> handleMethod('Upi')} className={`${styles.formGroup2} ${order.pay === 'Upi' ? styles.selected : `` }`}>
                                            <img src={upi} alt='upi'></img>
                                            <div className={styles.pay_text}>Via UPI</div>
                                        </div>
                                        <div onClick={()=> handleMethod('Card')}  className={`${styles.formGroup2} ${order.pay === 'Card' ? styles.selected : `` }`}>
                                            <img src={card} alt='upi'></img>
                                            <div className={styles.pay_text}>Via Debit/Credit Card</div>
                                        </div>
                                        <div onClick={()=> handleMethod('Cash')}  className={`${styles.formGroup2} ${order.pay === 'Cash' ? styles.selected : `` }`}>
                                            <img src={cod} alt='cod'></img>
                                            <div className={styles.pay_text}>Via Cash on Delivery</div>
                                        </div>
                                        {loading ? <div className={styles.loading}><img src={loader} alt='loading'></img> </div>
                                           : < button type="submit" onClick={handleCheckout} className="submitButton">Checkout</button>}
                                        </form>

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
    const { name, price, image_url, quantity } = props;

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
                <div className={styles.brand}>by Homestead</div>
            <div className={styles.qty_controller}>
                <div className={styles.window}>Qty: {quantity}</div>
            </div>
            </div>
            <div className={styles.total_sum}>₹ {(price * quantity)}</div>
        </div>
    )
}

const Navbar = ({user, setKey,setUser,cart,setcart, fav, setFav})=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            localStorage.clear();
            setUser(null);
            setcart([]);
            setKey(undefined);
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
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
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