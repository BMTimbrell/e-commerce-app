import React, { useState } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
import cart from '../../images/cart.png';

function Header({ userId }) {
    const [isCartActive, setIsCartActive] = useState(false);

    return (
        <header className="header">
            <div className="header__content">
                <Link to="/" className="logo">Splendid Shoes</Link>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item" key={"home"}>
                            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                                Home
                            </NavLink>
                        </li>
                        <li className="nav__item" key={"products"}>
                            <NavLink to="/products"  className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                                Products
                            </NavLink>
                        </li>
                        {!userId &&
                            <li className="nav__item" key={"login"}>
                                <NavLink to="/login"  className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                                    Login
                                </NavLink>
                            </li>
                        }
                        {userId &&
                            (
                                <>
                                    <li className="nav__item" key={"profile"}>
                                        <NavLink to="/profile"  className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li className={isCartActive ? 'nav__item cart cart-active' : 'nav__item cart'} key={"cart"}>
                                        <NavLink to="/cart"  className={({isActive}) => isActive ? setIsCartActive(true) : setIsCartActive(false)}>
                                            <img src={cart} alt="cart" style={{width: '2rem', display: 'block'}} />
                                        </NavLink>
                                    </li>
                                    <li className="nav__item" key={"logout"}>
                                        <NavLink to="/logout"  className={({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link'}>
                                            Logout
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </nav>
            </div>
            
        </header>
    );
}

export default Header;