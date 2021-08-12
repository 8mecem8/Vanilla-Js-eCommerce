export const getCartItems = () =>
{
    const cartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems
};


export const setCartItems = (Items) =>
{
    localStorage.setItem('cartItems',JSON.stringify(Items))

<<<<<<< HEAD
};


export const cleanCart = () =>
{
    localStorage.removeItem('cartItems')
}
=======
};
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d
