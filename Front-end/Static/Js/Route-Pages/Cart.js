import { parseRequestUrl, rerender } from '../Sup-files/Util.js'
import axios from "axios"
import { getCartItems, setCartItems } from '../Sup-files/Lstorage.js';


const addtoCart = (item,forceUpdate = false) =>
{
    
    let cartItems = getCartItems();

    
    const existItem = cartItems.find(at => at.Product === item.Product)
   
    

    if(existItem){
        if(forceUpdate){
    cartItems = cartItems.map((at)=> at.Product === existItem.Product ? item : at)}
            

        } else {cartItems = [...cartItems,item]}

    setCartItems(cartItems)

    if(forceUpdate){rerender()}
    
};


const removeFromCart = (id) =>
{
    setCartItems(getCartItems().filter((at=> at.Product !== id)))

    if(id === parseRequestUrl().id){document.location.hash = '/cart'}
    else(rerender(Cart))

}





const Cart =
{
  
aRender:()=>
    {
       const qtyslt= document.getElementsByClassName('qty-select')
       Array.from(qtyslt).forEach(qty =>
        {
            
            qty.addEventListener('change' ,(e)=>
            {
                
                
                let item = getCartItems().find(at =>at.Product === qty.id)
                

                addtoCart({...item, qty:+e.target.value}, true)

                 rerender(Cart)
                
            })
        })


        const deleteButtons = document.getElementsByClassName('deletebutton');
            
         Array.from(deleteButtons).forEach((deleteButton)=> 
        {
                deleteButton.addEventListener('click', ()=>
                {
                    removeFromCart(deleteButton.id);
                });
        })

        

         document.getElementById('checkout-button').addEventListener('click', () =>
         {
            document.location.hash = '/signin';
         });

    },

render: async()=>
    {
        const request = parseRequestUrl()
        if(request.id)
        {
            const reProduct = await axios.get(`http://localhost:5000/api/product/${request.id}`).then(at => at).catch(err => err);

            addtoCart({
            Product:reProduct.data._id,
            name:reProduct.data.name,
            image:reProduct.data.image,
            price:reProduct.data.price,
            countInStock:reProduct.data.countInStock,
            qty:1})
    
    
        }

        const cartItems = getCartItems()
        //console.log('cartItems is ==>', cartItems)

        return`
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                 ${
                    cartItems.length ===0 ? `<div>Cart is empty.<div><br><a href='/#/'>Go Shopping</a>`:
                    cartItems.map(at=>
                        
                        {   
                             return `
                            <li>
                                <div class='cart-image'>
                                    <img src='${at.image}' alt='${at.name}'>
                                </div>

                                <div class="cart-name">
                                    <div>
                                        <a href='/#/product/${at.Product}'>
                                        ${at.name}
                                        </a>
                                    </div>

                                    <div>
                                        Qty: <select class="qty-select" id='${at.Product}'>
                                                
                                            ${[...Array(at.countInStock).keys()].map((x)=>{return at.qty === x+1 ?
                                                `<option selected value="${x+1}">${x+1}</option>`:
                                                `<option value="${x+1}">${x+1}</option>`
                                            
                                            }) }


                                             </select>

                                             <button type='button' class='deletebutton' id='${at.Product}'>Delete</button>
                                    </div>
                                </div>

                                <div>
                                    <div class='cart-price'>
                                        $${at.price}
                                    </div>
                                
                                </div>
                            </li>
                            
                            `



                        }).join('\n')



                    }

                </ul>


            </div>

            <div class='cart-action'>
                    <h3>
                        Subtotal (${cartItems.reduce((a, c)=>a + c.qty,0)} items)
                        :
                        ${cartItems.reduce((a,c)=> a + c.price * c.qty,0)}                    
                    </h3>
                    <button id="checkout-button" class="primary fw">Proceed to Checkout</button>
            </div>
        
                
        </div>`

    }
};

export default Cart;



