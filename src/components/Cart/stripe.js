import "./style.css";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../App";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");

const StripePaymentForm = () => {
  const navigate = useNavigate();
  const { carts, setCarts } = useContext(CartContext);
const userId=localStorage.getItem("userId")
const token=localStorage.getItem("token")

// ----------------------------------
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
      // Cart();
    })
    .catch((err) => {
      console.log(err);
    });
};

  const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      emptyCart()
      console.log(carts);
      navigate("/");
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCarts([]);

      // ... SEND to your API server to process payment intent
    }
  };

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    return (
      <>
        <h1>stripe form</h1>
        <CardElement />
        <button onClick={handleSubmit(stripe, elements)}>Buy</button>
      </>
    );
  };
  //  useEffect(() => {
  //   PaymentForm();
  // }, [])
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripePaymentForm;
