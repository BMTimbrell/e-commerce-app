import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import cart from '../../images/cart.png';

function Header({ userId }) {
    return (
        <header>
            <h1>Splendid Shoes</h1>
            <nav>
                <ul>
                    <li key={"home"}>
                        <NavLink to="/" className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                            Home
                        </NavLink>
                    </li>
                    <li key={"products"}>
                        <NavLink to="/products"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                            Products
                        </NavLink>
                    </li>
                    {
                        //don't show if logged in
                        !userId &&
                        <li key={"login"}>
                            <NavLink to="/login"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                                Login
                            </NavLink>
                        </li>
                    }
                    {
                        userId &&
                        <li key={"profile"}>
                            <NavLink to="/profile"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                                Profile
                            </NavLink>
                        </li>
                    }
                    {
                        userId &&
                        <li key={"cart"}>
                            <NavLink to="/cart"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                                <img src={ cart } alt="cart" style={ {width: '2rem'} } />
                            </NavLink>
                        </li>
                    }
                    {
                        userId &&
                        <li key={"logout"}>
                            <NavLink to="/logout"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                                Logout
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;