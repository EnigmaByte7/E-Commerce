import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './fav_style.module.css'
import mpt from './mpt.png'

let id;
let name;
export default function Fav() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [cartLen, setCartLen] = useState(0);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        id = localStorage.getItem('userid');
        if (id) {
            fetchCartData(id);
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
            <Navbar user={user} setUser={setUser} cart={cartLen} setcart={setCart} />
            {user === null || user === undefined ? (
                <div className={styles.empty}>
                    <img src='https://cdn.pixabay.com/photo/2012/05/07/13/32/black-48472_640.png' alt='loggedout' />
                    <div className={styles.logg}>Please Login to Continue!</div>
                </div>
            ) : cartLen === 0 ? (
                <div className={styles.empty}>
                    <img src={mpt} alt='Empty Cart' />
                    <div className={styles.empty_text}>Oops! Your WishList is Empty.</div>
                </div>
            ) : (
                <div className={styles.cart}>
                    <div className={styles.cart_title}>Wishlist</div>
                    <div className={styles.main_cart}>
                        <div className={styles.product_list}>
                            <div className={styles.head}>
                                <div className={styles.product}>Product</div>
                                <div className={styles.price}>Price</div>
                            </div>
                            {cart &&
                                cart.map((item) => {
                                    const { name, price, image_url, id } = item;
                                    const props = { name, price, image_url, id };
                                    return <Product props={props} key={props.id} fetchCartData={fetchCartData} />;
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
const Product = ({ props, fetchCartData }) => {
    const { name, price, image_url } = props;

    return (
        <div className={styles.product_snip}>
            <div className={styles.img_cont}>
                <img src={image_url} alt='pro-img'></img>
            </div>
            <div className={styles.name_section}>
                <div className={styles.title}>{name}</div>
                <div className={styles.brand}>by Homestead</div>
            </div>
            <div className={styles.price_section}>₹{price}</div>
        </div>
    )
}

const Navbar = ({user, setUser,cart,setcart})=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            localStorage.clear();
            setUser(null);
            setcart([]);
            setIsLoggingOut(true);
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
            <div className='bag'>
            <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
                <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
    )
  }