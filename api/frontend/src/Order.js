import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './order_style.module.css'
import favob from './favob.png'
import box from './box.png'
import favo from './favo.png'
import empty from './empty_box.png'

let name;
export default function Order() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [cartLen, setCartLen] = useState(0);
    const [fav, setFav] = useState([]);
    const [id, setId] = useState(localStorage.getItem('userid'));
    const [order, setOrder] = useState([]);

    const fetchFavData = async (id) => {
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
                setFav(data.fav);
                
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchCartLen = async (id) => {
        try {
            const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/getlen', {
                method : 'POST',
                headers: {
                  'Content-type' : 'application/json',
                },
                body: JSON.stringify({userid : id}),
              });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setCartLen(data.length);
                
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchOrder = async (id) => {
        try {
            const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/getorders', {
                method : 'POST',
                headers: {
                  'Content-type' : 'application/json',
                },
                body: JSON.stringify({userid : id}),
              });
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setOrder(data.order);
                
            } else {
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        const Id = localStorage.getItem('userid');
        setId(Id);
    }, []);

    useEffect(() => {
        name = localStorage.getItem('user');
        setUser(name);
    }, []);

    useEffect(() => {
        if (user) {
            fetchCartLen(id);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchFavData(id);
        }
    }, []);
    
    useEffect(() => {
        if (id) {
            fetchOrder(id);
        }
    }, []);


    console.log(id);
    console.log(name)
    console.log(user)
    console.log(fav);
    console.log(cartLen);

    return (
        <div>
            <Toaster />
            <Navbar user={user} setUser={setUser} setFav={setFav} cartLen={cartLen} fav={fav} setOrder={setOrder}/>
            {user === null || user === undefined ? (
                <div className={styles.empty}>
                    <img src='https://cdn.pixabay.com/photo/2012/05/07/13/32/black-48472_640.png' alt='loggedout' />
                    <div className={styles.logg}>Please Login to Continue!</div>
                </div>
            ) : order.length === 0 ? (
                <div className={styles.empty}>
                    <img src={empty} alt='Empty Cart' />
                    <div className={styles.empty_text}>Oops! You don't have any Orders yet.</div>
                </div>
            ) : (
                <div className={styles.cart}>
                    <div className={styles.cart_title}>Your Orders</div>
                    <div className={styles.main_cart}>
                        <div className={styles.product_list}>
                            <div className={styles.head}>
                                <div className={styles.sections}>Billed to</div>
                                <div className={styles.sections}>Address</div>
                                <div className={styles.sections}>Products</div>
                                <div className={styles.sections}>Cost</div>
                                <div className={styles.sections}>Mode of Payment</div>
                                <div className={styles.sections}>Date of Purchase</div>
                                <div className={styles.sections}>Status</div>
                            </div>
                            {order &&
                                order.map((item) => {
                                    const { username, state, city, zip, pay,date,cost} = item;
                                    const props = { username, state, city, zip, pay,date,cost };
                                    return <Product len={order.length} props={props} key={props.product_id} setUser={setUser} fetchFavData={fetchFavData} />;
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
const Product = ({ props, fetchFavData, setUser,key,len }) => {
    const days = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const {username, state, city, zip, pay,date ,cost} = props;
    const d = new Date(date);
    const newdate =  days[d.getDay()] + "  " + d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    return (
        <div id={date} className={styles.product_snip}>
            <div className={styles.data_section}>{username}</div>
            <div  className={styles.add_section}>
                <div  className={styles.data_section}>{city}</div>
                <div  className={styles.data_section}>{state}</div>
            </div>
            <div  className={styles.data_section}>{len}</div>
            <div  className={styles.data_section}>{cost}</div>
            <div  className={styles.data_section}>{pay}</div>
            <div  className={styles.data_section}>{date}</div>
            <div  className={styles.data_section}>Fullfilled</div>
        </div>
    )
}

const Navbar = ({user, setUser,cartLen,setFav,setOrder ,fav})=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    console.log(cartLen);
    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            localStorage.clear();
            setUser(null);
            setOrder([]);
            setFav([]);
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
                <Link to='/about'><div className='abt'>About</div></Link>
            </div>
            <div className='icons'>
            <div><Link to='/orders'><img src={box} alt='bag' id='box'></img></Link></div>
            <div><Link to='/favorites'><img src={(user && fav.length > 0) ? favo : favob} alt='bag' id='cart'></img></Link></div>
            <div className='bag'>
            <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cartLen}</div>}
            </div>
                <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
    )
  }