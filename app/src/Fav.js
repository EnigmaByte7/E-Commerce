import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import  { useEffect ,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import logout from './logout.png'
import { useNavigate,Link } from 'react-router-dom';
import styles from './fav_style.module.css'
import del from './del.png'
import wsh from './wsh.png'
import favob from './favob.png'
import favo from './favo.png'

let name;
export default function Fav() {
    const [user, setUser] = useState(localStorage.getItem('user'));
    const [cartLen, setCartLen] = useState(0);
    const [fav, setFav] = useState([]);
    const [id, setId] = useState(localStorage.getItem('userid'));

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
            const response = await fetch('http://localhost:5000/api/users/getlen', {
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


    console.log(id);
    console.log(name)
    console.log(user)
    console.log(fav);
    console.log(cartLen);

    return (
        <div>
            <Toaster />
            <Navbar user={user} setUser={setUser} setFav={setFav} cartLen={cartLen} fav={fav} />
            {user === null || user === undefined ? (
                <div className={styles.empty}>
                    <img src='https://cdn.pixabay.com/photo/2012/05/07/13/32/black-48472_640.png' alt='loggedout' />
                    <div className={styles.logg}>Please Login to Continue!</div>
                </div>
            ) : fav.length === 0 ? (
                <div className={styles.empty}>
                    <img src={wsh} alt='Empty Cart' />
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
                            {fav &&
                                fav.map((item) => {
                                    const { name, price, image_url, catg, product_id } = item;
                                    const props = { name, price, image_url, product_id ,catg};
                                    return <Product  props={props} key={props.product_id} setUser={setUser} fetchFavData={fetchFavData} />;
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
const Product = ({ props, fetchFavData, setUser,key }) => {
    const navigate = useNavigate();
    const { name, price, image_url,catg,product_id } = props;
    const userid = localStorage.getItem('userid');

    const redirect = ()=>{
        navigate(`/products/${catg}#${product_id}`);
    }

    const handleFav = async ()=>{
        try {
            const response = await fetch('http://localhost:5000/api/users/rmvfav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  userid:userid, name:name}),
            });
            const data = await response.json();
            
            console.log(data.message);
            if(response.ok)
            {
                toast.success(data.message,{
                    duration:2000,
                    position:'top-center'
                })
            }
            if(!response.ok){
                toast.error(data.message);
            }
        } catch (err) {
            throw(err);
        }
        fetchFavData(userid);
    }    

    return (
        <div id={product_id} className={styles.product_snip}>
            <div onClick={redirect}  className={styles.img_cont}>
                <img src={image_url} alt='pro-img'></img>
            </div>
            <div onClick={redirect}  className={styles.name_section}>
                <div className={styles.title}>{name}</div>
                <div className={styles.brand}>by Homestead</div>
            </div>
            <div onClick={redirect}  className={styles.price_section}>₹{price}</div>
            <div className={styles.del_section}>
                <img  onClick={handleFav} src={del} alt='del'></img>
            </div>
        </div>
    )
}

const Navbar = ({user, setUser,cartLen,setFav, fav})=>{
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    console.log(cartLen);
    const handleClick = (e) => {
        e.preventDefault();
        if (user) {
            localStorage.clear();
            setUser(null);
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
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
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