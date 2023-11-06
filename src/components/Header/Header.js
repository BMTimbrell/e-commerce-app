import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header>
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
                    <li key={"login"}>
                        <NavLink to="/login"  className={ ({isActive}) => isActive ? 'nav-link nav-link-active' : 'nav-link' }>
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;