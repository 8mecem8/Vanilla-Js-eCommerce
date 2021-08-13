import axios from "axios";
import { getCartItems } from "./Lstorage";

export const parseRequestUrl = () => {
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");

  //console.log('request is =>>>',request)

  return {
    resource: request[1],
    id: request[2],
    verb: request[3],
  };
};

export const rerender = async (component) => {
  document.querySelector(".main-container").innerHTML =
    await component.render();
  if (component.aRender) {
    await component.aRender();
  }
};

export const signina = async (credentials) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/signin",
    credentials
  );

  return response.data;
};

export const registera = async (credentials) => {
  const response = await axios.post(
    "http://localhost:5000/api/users/register",
    credentials
  );

  return response.data;
};

export const update = async (credentials) => {
  const { _id, token } = await getUserInfo();

  const config = { headers: { Authorization: `bearer ${token}` } };

  const response = await axios.put(
    `http://localhost:5000/api/users/${_id}`,
    credentials,
    config
  );

  return response.data;
};

export const setUserInfo = async (data) => {
  window.localStorage.setItem("loggedappUser", JSON.stringify(data));
};

export const getUserInfo = async () => {
  return window.localStorage.getItem("loggedappUser")
    ? JSON.parse(window.localStorage.getItem("loggedappUser"))
    : { name: "", email: "", password: "" };
};

/* ------------loading screen----------------- */

export const showLoading = () => {
  document.getElementById("loading-overlay").classList.add("active");
};

export const hideLoading = () => {
  document.getElementById("loading-overlay").classList.remove("active");
};

/* ------------loading screen end----------------- */

export const showMessage = (message, callback) => {
  document.getElementById("message-overlay").innerHTML = `
  <div>
    <div id="message-overlay-content">${message}</div>
    <button id="message-overlay-close-button">OK</button>
  </div>
  `;
  document.getElementById("message-overlay").classList.add("active");
  document
    .getElementById("message-overlay-close-button")
    .addEventListener("click", () => {
      document.getElementById("message-overlay").classList.remove("active");
      if (callback) {
        callback();
      }
    });
};

export const redirectUser = () => {
  if (getCartItems().length !== 0) {
    document.location.hash = "/shipping";
  } else {
    document.location.hash = "/";
  }
};

export const getShipping = () => {
  const shipping = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      };

  return shipping;
};

export const setShipping = async ({
  address = "",
  city = "",
  postalCode = "",
  country = "",
}) => {
  window.localStorage.setItem(
    "shipping",
    JSON.stringify({ address, city, postalCode, country })
  );
};

export const getPayment = () => {
  const payment = localStorage.getItem("payment")
    ? JSON.parse(localStorage.getItem("payment"))
    : {
        paymentMethod: "paypal",
      };

  return payment;
};

export const setPayment = async ({ paymentMethod = "paypal" }) => {
  window.localStorage.setItem("payment", JSON.stringify({ paymentMethod }));
};

export const createOrder = async (order) => {
  try {
    const { _id, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        userName: name,
        userId: _id,
      },
    };

    const response = await axios.post(
      `http://localhost:5000/api/order`,
      order,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };

    //console.log('error in function is',err.response.data.error)
  }
};

export const getOrder = async (id) => {
  try {
    const { _id, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        userName: name,
        userId: _id,
      },
    };

    const response = await axios.get(
      `http://localhost:5000/api/order/${id}`,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};

export const getPaypalId = async (id) => {
  try {
    const { _id, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        userName: name,
        userId: _id,
      },
    };

    const response = await axios.get(
      `http://localhost:5000/api/paypal/clientId`,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};

export const payOrder = async (orderId, paymentResult) => {
  try {
    const { _id, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        userName: name,
        userId: _id,
      },
    };

    const response = await axios.put(
      `http://localhost:5000/api/order/${orderId}/pay`,
      paymentResult,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};

export const getMyOrders = async () => {
  try {
    const { _id, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        userName: name,
        userId: _id,
      },
    };

    const response = await axios.get(
      `http://localhost:5000/api/order/mine`,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/products`);
    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};

export const createProduct = async (product) => {
  try {
    const { isAdmin, name, token } = await getUserInfo();

    const config = {
      headers: {
        Authorization: `bearer ${token}`,
        user: name,
        isAdmin: isAdmin
      },
    };

    const response = await axios.post(
      `http://localhost:5000/api/product`,
      product,
      config
    );

    return response.data;
  } catch (err) {
    return { message: err.response ? err.response.data.error : err.message };
  }
};
