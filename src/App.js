import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Register from "./components/Register/index";
import Login from "./components/Login/index";
import Navigation from "./components/Navbar";
import Home from "./components/Home/index.js";
import ProductPage from "./components/product/product";
import Cart from "./components/Cart";
import StripePaymentForm from "./components/Cart/stripe";
import AboutUs from "./components/About/aboutUs";
import DeliveryInfo from "./components/About/Delivery Info";

export const TokenContext = createContext();
export const IsLoginContext = createContext();
export const ProductDetailsContext = createContext();
export const ParamContext = createContext();
export const FirstNameContext = createContext();
export const FeedBackContext = createContext();
export const CartContext = createContext();
export const UserIdContext = createContext();

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const [userId, setUserId] = useState(
    window.localStorage.getItem("userId") || ""
  );
  const [firstName, setFirstName] = useState(
    window.localStorage.getItem("firstName") || ""
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productDetails, setProductDetails] = useState("");
  const [param, setParam] = useState("");
  // const [firstName, setFirstName] = useState("");
  const [feedBack, setFeedback] = useState("");
  const [carts, setCarts] = useState([]);
  // const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <TokenContext.Provider value={{ token, setToken }}>
        <IsLoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <ProductDetailsContext.Provider
            value={{ productDetails, setProductDetails }}
          >
            <ParamContext.Provider value={{ param, setParam }}>
              <FirstNameContext.Provider value={{ firstName, setFirstName }}>
                <FeedBackContext.Provider value={{ feedBack, setFeedback }}>
                  <CartContext.Provider value={{ carts, setCarts }}>
                    <UserIdContext.Provider value={{ userId, setUserId }}>
                      <Navigation />
                      <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path={`/product/:id`}
                          element={<ProductPage />}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/DeliveryInfo" element={<DeliveryInfo/>} />
                        <Route
                          path="/payment"
                          element={<StripePaymentForm />}
                        />

                        <Route path="/" element={<Home />} />
                      </Routes>
                    </UserIdContext.Provider>
                  </CartContext.Provider>
                </FeedBackContext.Provider>
              </FirstNameContext.Provider>
            </ParamContext.Provider>
          </ProductDetailsContext.Provider>
        </IsLoginContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
