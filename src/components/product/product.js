import "./style.css";
import axios from "axios";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ParamContext } from "../../App";
import { ProductDetailsContext } from "../../App";
import { FeedBackContext } from "../../App";
import { TokenContext } from "../../App";
import { CartContext } from "../../App";
import { FirstNameContext } from "../../App";

// import Home from "../Home/index.js";

const ProductPage = () => {
  const productId = useParams();
  console.log(productId.id);
  const navigate = useNavigate();
  const { param, setParam } = useContext(ParamContext);
  const { token, setToken } = useContext(TokenContext);
  const { productDetails, setProductDetails } = useContext(
    ProductDetailsContext
  );
  const { carts, setCarts } = useContext(CartContext);
  const { firstName, setFirstName } = useContext(FirstNameContext);

  const { feedBack, setFeedback } = useContext(FeedBackContext);

  useEffect(() => {
    productPage();
  }, []);

  const productPage = () => {
    console.log(productId);
    axios
      .get(
        `http://localhost:5000/products/${productId.id}`
      ) /* .populate({path: 'feedBack',
      populate: {
        path: 'commenter',
        model: 'FeedBack'
      } }) */
      .then((result) => {
        setProductDetails(result.data.product);
        setParam(productId);

        console.log("result correct", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreatFeedBack = () => {
    axios
      .post(
        `http://localhost:5000/products/${productId.id}/feedback`,
        { feedBack },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        // navigate(`/products/${param}`);
        productPage();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = (id) => {
    if (!token) return alert("Please login to continue buying");
    console.log(id);
    axios
      .post(
        "http://localhost:5000/cart",
        {
          productId: id,
          quantity: 1,
        },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        console.log(result);
        setCarts(result.data.items);
        console.log(carts);
        // setPayloader(result.data);
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };

  return (
    <div className="ProductPage">
      {/* <img src={productDetails[0].image} /> */}

      {/* image */}
      {/* box +button */}
      {/* feedback */}

      <div className="image_cont">
        <img className="image" src={productDetails.image}></img>
      </div>
      <div className="detailsAndImage">
        <h2 className="title">{productDetails.title}</h2>
        <p className="Price">${productDetails.price}</p>
        <p className="description">{productDetails.description}</p>
        <p className="Sold">{productDetails.sold}</p>
        <button
          className="AddToCart"
          id={productDetails._id}
          onClick={(e) => addToCart(e.target.id)}
        >
          Add To Cart
        </button>
      </div>

      <div className="feedBack-Product">
        <h5>Review</h5>
        <>
          {productDetails.feedBack==0  ? (
            <h3> There are no reviews for this product. </h3>
          ) : (
            productDetails.feedBack &&
            productDetails.feedBack.map((element, index) => {
              console.log(element);
              return (
                <div className="feed">
                  <h4 className="commenter">{element.commenter.firstName}</h4>
                  <p className="feedback">{element.feedBack}</p>
                  <div></div>
                </div>
              );
            })
          )}
        </>
        <input
          placeholder="Add Your FeedBack"
          onChange={(e) => {
            console.log(e.target.value);
            setFeedback(e.target.value);
          }}
        />
        <button
          id={productDetails._id}
          className="add-feedBack"
          onClick={(e) => {
            console.log(e.target.id);
            CreatFeedBack();
          }}
        >
          Add FeedBack
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
