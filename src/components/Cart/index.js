import "./style.css";
import { TokenContext } from "../../App";
// import { Routes, Route, Link } from "react-router-dom";
import { BiXCircle } from "react-icons/bi";
import { ProductDetailsContext } from "../../App";
import { ParamContext } from "../../App";
import { IsLoginContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FeedBackContext } from "../../App";
import { CartContext } from "../../App";
import { UserIdContext } from "../../App";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import StripePaymentForm from "./stripe";
import PaypalButton from "./PayPal"; 
//

const Cart = () => {
  const { carts, setCarts } = useContext(CartContext);
  const { token, setToken } = useContext(TokenContext);
  const [item, setItem] = useState("");
  // const [cart,setCart]=useState([])
  const { userId, setUserId } = useContext(UserIdContext);

  useEffect(() => {
    getCartItem();
  }, []);

  const getCartItem = async () => {
    console.log(userId);
    console.log("token in cart", token.userId);

    await axios
      .get(`https://devashop.herokuapp.com/cart/${userId}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((result) => {
        console.log(result.data.cart);
        setItem(result.data.cart);
        setCarts(result.data.cart.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async (id, quantity) => {
    if (!token) return alert("Please login to continue buying");
    await axios
      .post(
        "https://devashop.herokuapp.com/cart",
        {
          productId: id,
          quantity: quantity,
        },
        quantity
      )
      .then((result) => {
        console.log("result:", result.data);
        setItem(result.data);
        setCarts(result.data.items);
        getCartItem();
        // console.log(carts);
        // setPayloader(result.data);
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };

  const emptyCart = async () => {
    await axios
      .delete(
        `https://devashop.herokuapp.com/cart/${userId}`,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        setCarts([]);
        setItem("");
        // Cart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 /*  const tranSuccess = async(payment) => {
    const {paymentID, address} = payment;

    await axios.post('/api/payment', {carts, paymentID, address})
  } */


  const removeItemFromCart = async (productId) => {
    await axios
      .post(
        `https://devashop.herokuapp.com/cart/${userId}/product`,
        { productId: productId },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((result) => {
        if (carts.length === 1) {
          console.log(carts.length);
          setCarts([]);
          setItem("");
        }
        console.log(result);
        getCartItem();
      })
      .catch((err) => {
        console.log(err);
      });
  };
const product={
  name: "Tesla Roadster",
    price: 64998.67,
    description: "Cool car"
}
  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token ,product}
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    setCarts([]);
      setItem("");
    if (status === "success") {
      
      toast("Success! Check email for details", { type: "success" });
      
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="Cart_Page">
      {console.log("item:", item)}
      {!carts || !item ? (
        <h1>Your shopping cart is empty!</h1>
      ) : (
        carts &&
        carts.map((element, index) => {
          console.log(element);
          return (
            <div className="ProductDetails">
              <div key={index} className="image_Container">
                {" "}
                <img
                  key={index}
                  className="product_image"
                  src={element.productId.image}
                />
              </div>
              <div key={index} className="Details_Container">
                <h2 key={index} className="title">
                  {element.productId.title}
                </h2>
                <h3 key={index} className="price">
                  ${element.total}
                </h3>
                <p key={index} className="description">
                  {element.productId.description}
                </p>
                <div key={index} className="button_Container">
                  <button
                    key={index}
                    className="decrees"
                    id={element.productId._id}
                    onClick={(e) => {
                      addToCart(e.target.id, -1);
                    }}
                  >
                    -
                  </button>
                  <p key={index} className="total">
                    {element.quantity}
                  </p>
                  <button
                    key={index}
                    className="increase"
                    id={element.productId._id}
                    onClick={(e) => {
                      addToCart(e.target.id, 1);
                    }}
                  >
                    +
                  </button>
                  <div className="delete_product" key={index}>
                    <button
                      id={element.productId._id}
                      onClick={(e) => {
                        // console.log(e.target);
                        removeItemFromCart(e.target.id);
                      }}
                    >
                      {" "}
                      X
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      <div className="emptyCart">
        {item ? (
          <h3 className="subTotal">Total :${item.subTotal}</h3>
        ) : (
          <h3 className="subTotal">Total : 0 </h3>
        )}

        <button
          className="stripe"
          onClick={(e) => {
            emptyCart();
          }}
        >
          {" "}
          Empty Cart
        </button>
        
        
        
        <StripeCheckout
        stripeKey="pk_test_51L0Yh4Cs43O88ha5zuVOO867HGTxbxH6Ej639RXS8Ju0Zg06rpUSbaJvJv100cHUAAfraHXPebVmBxhlEtgb2EO400ij2HLEBA"
        token={handleToken}
        // amount={product.price * 100}
        name="DEVA $HOP"
        billingAddress
        shippingAddress
      />
      
      </div>
    </div>
  );
};

export default Cart;

