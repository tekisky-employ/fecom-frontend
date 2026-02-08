import axios from "axios";
import { useEffect, useState } from "react";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  // 🔐 GET USER INFO
  useEffect(() => {
    if (!token) return; // 🔥 VERY IMPORTANT

    const getUser = async () => {
      try {
        const res = await axios.get("/user/info", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsLogged(true);
        setCart(res.data.cart || []);
        // setIsAdmin(res.data.role === 1);
        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    getUser();
  }, [token]);

  // 💾 SAVE CART
  useEffect(() => {
    if (!token) return;
    if (!isLogged) return;

    const saveCart = async () => {
      try {
        await axios.patch(
          "/user/addcart",
          { cart },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (err) {
        console.log("Cart save error", err);
      }
    };

    saveCart();
  }, [cart, token, isLogged]);

  // 🛒 ADD TO CART
  const addCart = (product) => {
    if (!isLogged) return alert("Please login");

    const check = cart.every((item) => item._id !== product._id);

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("Product already in cart");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart,
  };
}

export default UserAPI;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function UserAPI(token) {
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [cart, setCart] = useState([]);

//   // ✅ GET USER INFO + LOAD CART
//   useEffect(() => {
//     if (token) {
//       const getUser = async () => {
//         try {
//           const res = await axios.get("/user/info", {
//             headers: { Authorization: token },
//           });

//           setIsLogged(true);
//           setCart(res.data.cart);
//           res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
//         } catch (error) {
//           alert(error.response?.data?.msg || "User info error");
//         }
//       };
//       getUser();
//     }
//   }, [token]);

//   // ✅ SAVE CART TO BACKEND WHEN CART CHANGES

//   useEffect(() => {
//   if (!token) return;

//   if (cart.length === 0) return;

//   const saveCart = async () => {
//     try {
//       await axios.patch(
//         "/user/addcart",
//         { cart },
//         { headers: { Authorization: token } }
//       );
//     } catch (err) {
//       console.log("Cart save error", err);
//     }
//   };

//   saveCart();
// }, [cart, token]);
//   // ✅ ADD TO CART
//   const addCart = (product) => {
//     if (!isLogged) return alert("Please Login");

//     const check = cart.every((item) => item._id !== product._id);

//     if (check) {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     } else {
//       alert("This product is already in cart");
//     }
//   };

//   return {
//     isLogged: [isLogged, setIsLogged],
//     isAdmin: [isAdmin, setIsAdmin],
//     cart: [cart, setCart],
//     addCart: addCart,
//   };
// }

// export default UserAPI;
