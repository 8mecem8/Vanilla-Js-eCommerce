export const getCartItems = () =>
{
    const cartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems
};


export const setCartItems = (Items) =>
{
    localStorage.setItem('cartItems',JSON.stringify(Items))

};


export const cleanCart = () =>
{
    localStorage.removeItem('cartItems')
}