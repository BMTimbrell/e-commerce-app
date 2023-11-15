import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Logout from './components/Login/Logout';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import ProductDetails from './components/Products/ProductDetails';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import OrderDetails from './components/Orders/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Root /> }>
          <Route index element={ <Home/> }/>
          <Route path="register" element={ <Register /> }/>
          <Route path="login" element={ <Login /> }/>
          <Route path="logout" element={ <Logout /> }/>
          <Route path="profile" element={ <Profile /> } />
          <Route path="profile/orders" element={ <Orders /> } />
          <Route path="profile/orders/:id" element={ <OrderDetails /> } />
          <Route path="products" element={ <Products /> } />
          <Route path="products/:id" element={ <ProductDetails /> }/>
          <Route path="cart" element={ <Cart /> } />
          <Route path="checkout" element={ <Checkout /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
