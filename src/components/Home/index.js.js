import "./style.css";
import axios from "axios";
import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { TokenContext } from "../../App";
import { ProductDetailsContext } from "../../App";
import { ParamContext } from "../../App";
import { IsLoginContext } from "../../App";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FeedBackContext } from "../../App";
import { CartContext } from "../../App";
import ReactPaginate from "react-paginate";

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { productDetails, setProductDetails } = useContext(
    ProductDetailsContext
  );
  const { token, setToken } = useContext(TokenContext);

  const { carts, setCarts } = useContext(CartContext);

  const [category, setCategory] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const { param, setParam } = useContext(ParamContext);
  const [productSorted, setProductSorted] = useState([]);
  const [page, setPage] = useState(1);

  const { feedBack, setFeedback } = useContext(FeedBackContext);

  const GetAllProduct = (page) => {
    console.log("page", page);
    setPage(page);
    let limit = 9;
    axios
      .get(`http://localhost:5000/products/${page}/${limit}`)
      .then((result) => {
        console.log(result.data.products);
        setProduct(result.data.products);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log("page", page);
    setFilterArray([]);
    // setProductSorted([]);
  };

  const getAllCategory = () => {
    axios
      .get("http://localhost:5000/category")
      .then((result) => {
        setCategory(result.data.Category);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const filter = (categoryId) => {
    axios
      .get("http://localhost:5000/products")
      .then((result) => {
        console.log(result.data.products);
        setProduct(result.data.products);
      })
      .catch((err) => {
        console.log(err.message);
      });

    const filterCategory = product.filter((element, index) => {
      return element.category_id._id == categoryId;
    });
    setFilterArray(filterCategory);
    setProductSorted([]);
    setSearchArray([]);
    // GetAllProduct();
  };

  const sort = (statement) => {
    if (statement == "low price") {
      
      let sortedProduct = product.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );

      setProductSorted(sortedProduct);
      console.log("product", sortedProduct);
    } else if (statement == "high price") {
      let sortedProduct = product.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );

      setProductSorted(sortedProduct);
      console.log("product", sortedProduct);
    } else if (statement == "select") {
      let sortedProduct = product;
      setProductSorted(sortedProduct);
    }
    GetAllProduct();
  };

  const productPage = (productId) => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((result) => {
        setProductDetails(result.data.product);
        setParam(productId);

        // navigate(`/products/${productId}`);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchProductByName = (searchInput) => {
    axios
    .get("http://localhost:5000/products")
    .then((result) => {
      console.log(result.data.products);
      setProduct(result.data.products);
    })
    .catch((err) => {
      console.log(err.message);
    });


    const search = product.filter((element, index) => {
      console.log(searchInput);
      return element.title.includes(searchInput);
    });
    console.log(search);
    setSearchArray(search);
    setFilterArray([]);
    setProductSorted([]);
  };

  const addToCart = async (id) => {
    if (!token) return alert("Please login to continue buying");
    console.log(id);
    await axios
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
    alert("Product added to cart");
  };

  useEffect(() => {
    productPage();
    console.log(feedBack);
  }, [feedBack]);

  useEffect(() => {
    GetAllProduct();
    getAllCategory();
    productPage();
  }, []);

  return (
    <div className="Home">
      <div className="bar">
        <div className="filter_container">
          <p>Filter</p>
          <select
            onChange={(e) =>{
              e.target.value == "select"
                ? (GetAllProduct(1))
                : (filter(e.target.value))}
            }
          >
            <option>select</option>
            {category.map((element, index) => {
              return (
                <option key={index} value={element._id}>
                  {element.title}
                </option>
              );
            })}
          </select>
        </div>

        <input
          type={"text"}
          className="serch"
          placeholder="Serch By Name "
          onChange={(e) => {
            searchProductByName(e.target.value);
          }}
        />
        <div className="sort_container">
          <p>sort</p>
          <select
            onClick={(e) => {
              sort(e.target.value);
            }}
          >
            <option className="sort">select</option>
            <option> low price </option>
            <option> high price </option>
          </select>
        </div>
      </div>

      {productSorted.length === 0 ? (
        searchArray.length === 0 ? (
          filterArray.length === 0 ? (
            <div className="product_container">
              {product ? (
                product.map((element, index) => {
                  // console.log(product);
                  return (
                    <div className="ProductHome" key={index}>
                      <img src={element.image} className="productImage" />
                      <div className="product_box">
                        <h2 className="title" key={index} id={element._id}>
                          {element.title}
                        </h2>
                        <span className="price" key={index} id={element._id}>
                          $ {element.price}{" "}
                        </span>
                        <br />
                        <p className="description" id={element._id}>
                          {element.description}
                        </p>
                        <br />
                      </div>
                      <div className="button_con">
                        <a
                          id={element._id}
                          className="Add_to_Cart"
                          onClick={(e) => addToCart(e.target.id)}
                        >
                          Add to Cart{" "}
                        </a>

                        <button className="view">
                          <Link to={`/product/${element._id}`}>
                            View Product
                          </Link>
                        </button>
                      </div>

                      <br />
                    </div>
                  );
                })
              ) : (
                <h1>No product Here </h1>
              )}
            </div>
          ) : (
            <div className="product_container">
              {filterArray.map((element, index) => {
                return (
                  <div
                    className="ProductHome"
                    key={index}
                    /* style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "solid",
                  }} */
                  >
                    <img src={element.image} className="productImage" />
                    <div className="product_box">
                      <h2 className="title" key={index} id={element._id}>
                        {element.title}
                      </h2>
                      <span className="price" key={index} id={element._id}>
                        $ {element.price}{" "}
                      </span>
                      <br />
                      <p className="description" id={element._id}>
                        {element.description}
                      </p>
                    </div>

                    <div className="button_conF">
                      <a
                        id={element._id}
                        className="Add_to_Cart"
                        onClick={(e) => addToCart(e.target.id)}
                      >
                        Add to Cart{" "}
                      </a>
                      <button className="view">
                        <Link to={`/product/${element._id}`}>View Product</Link>
                      </button>
                    </div>

                    <br />
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div className="product_container">
            {searchArray.map((element, index) => {
              return (
                <div className="product_container">
                  <div
                    className="ProductHome"
                    key={index}
                    /* style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "solid",
                }} */
                  >
                    <img src={element.image} className="productImage" />
                    <div className="product_box">
                      <h2 className="title" key={index} id={element._id}>
                        {element.title}
                      </h2>
                      <span className="price" key={index} id={element._id}>
                        $ {element.price}{" "}
                      </span>
                      <br />
                      <p className="description" id={element._id}>
                        {element.description}
                      </p>
                    </div>
                    <div className="button_con">
                      <a
                        id={element._id}
                        className="Add_to_Cart"
                        onClick={(e) => addToCart(e.target.id)}
                      >
                        Add to Cart{" "}
                      </a>
                      <button className="view">
                        <Link to={`/product/${element._id}`}>View Product</Link>
                      </button>
                    </div>

                    <br />
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="product_container">
          {productSorted.map((element, index) => {
            return (
              <div className="ProductHome" key={index}>
                <img src={element.image} className="productImage" />
                <div className="product_box">
                  <h2 className="title" key={index} id={element._id}>
                    {element.title}
                  </h2>
                  <span className="price" key={index} id={element._id}>
                    $ {element.price}{" "}
                  </span>
                  <br />
                  <p className="description" id={element._id}>
                    {element.description}
                  </p>
                  <br/>
                </div>
                <div className="button_con">
                  <a
                    id={element._id}
                    className="Add_to_Cart"
                    onClick={(e) => addToCart(e.target.id)}
                  >
                    Add to Cart{" "}
                  </a>
                  <button className="view">
                    <Link to={`/product/${element._id}`}>View Product</Link>
                  </button>
                </div>

                <br />
              </div>
            );
          })}
        </div>
      )}

      <div class="pagination">
        {/* {product.map((element,index)=>{
  return(
    <a href="#" id={index} onClick={(e)=>{
    GetAllProduct(e.target.id);
  }} >{index}</a>
  )
  
})} */}

        <a
          href="#"
          onClick={(e) => {
            page > 0 ? GetAllProduct(page - 1) : GetAllProduct(1);
          }}
        >
          &laquo;
        </a>
        <a
          href="#"
          id="1"
          onClick={(e) => {
            GetAllProduct(e.target.id);
          }}
        >
          1
        </a>
        <a
          href="#"
          id="2"
          onClick={(e) => {
            GetAllProduct(e.target.id);
          }}
        >
          2
        </a>
        <a
          href="#"
          id="3"
          onClick={(e) => {
            GetAllProduct(e.target.id);
          }}
        >
          3
        </a>

        {/* <a href="#" id="6" onClick={(e)=>{
    GetAllProduct(e.target.id);
  }}>6</a>
  <a href="#" id="7" onClick={(e)=>{
    GetAllProduct(e.target.id);
  }}>7</a>
  <a href="#" id="8" onClick={(e)=>{
    GetAllProduct(e.target.id);
  }}>8</a> */}

        <a
          href="#"
          onClick={(e) => {
            console.log(page);
            if (page < 5) {
              GetAllProduct(page + 1);
            } else {
              GetAllProduct(5);
            }
          }}
        >
          &raquo;
        </a>
      </div>
    </div>
  );
};
//state
export default Home;
