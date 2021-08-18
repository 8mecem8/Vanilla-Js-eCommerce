
import { cleanCart, getCartItems } from "../Sup-files/Lstorage.js"
import { createOrder, getOrder, getPayment, getPaypalId, getShipping, hideLoading, parseRequestUrl, payOrder, rerender, showLoading, showMessage,getUserInfo, deliverOrder, deliverOrdero } from "../Sup-files/Util.js"




//https://developer.paypal.com/docs/archive/checkout/integrate/?mark=get%20the%20code ,  paypal code resource 


const addPaypalSdk = async (totalPrice) =>
{
    const clientId = await getPaypalId()

    
    showLoading()


    if(!window.paypal)
    
    {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.async = true;
        script.onload = () => handlePayment(clientId, totalPrice);
        document.body.appendChild(script);
    }

    else 

    {
        handlePayment(clientId, totalPrice);
    }
}








const handlePayment = (clientId, totalPrice) => {
  window.paypal.Button.render(
    {
      env: 'sandbox',
      client: {
        sandbox: clientId.clientId,
        production: '',
      },
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'gold',
        shape: 'pill',
      },

      commit: true,
      payment(data, actions) {
        return actions.payment.create({
          transactions: [
            {
              amount: {
                total: totalPrice,
                currency: 'USD',
              },
            },
          ],
        });
      },
      onAuthorize(data, actions) {
        return actions.payment.execute().then(async () => {
          showLoading();
          await payOrder(parseRequestUrl().id, {
            orderID: data.orderID,
            payerID: data.payerID,
            paymentID: data.paymentID,
          });
          hideLoading();
          showMessage('Payment was successfull.', () => {
            rerender(OrderScreen);
          });
        });
      },
    },
    '#paypal-button'
  ).then(() => {
    hideLoading();
  });
};













const OrderScreen =
{
    aRender: async ()=>
    {

      const request = parseRequestUrl();

      
    if (document.getElementById('deliver-order-button')) {

      document.addEventListener('click', async () => {

        showLoading();

        await deliverOrdero(request.id);

         hideLoading();

          showMessage('Order Delivered.');

        //rerender(OrderScreen);

        document.location.hash = '/orderlist'

      })


      
    }


  },
    
    render: async ()=>
    {

        const request = parseRequestUrl()

        const {isAdmin}= await getUserInfo()


        const {_id,orderItems,shippingPrice,shipping,payment,itemPrice,taxPrice,totalPrice,isDelivered,deliveredAt,isPaid,paidAt} = await getOrder(request.id)
    
        

        if(!isPaid)
        {
            if(totalPrice){addPaypalSdk(totalPrice)}
        }

    

        return`

            
            <h1>Order ${_id}</h1>

            <div class="order">
                <div class="order-info">
                    <div>
                        <h2>Shipping</h2>
                        <div>
                        ${shipping.address ? shipping.address: "" }, ${shipping.city ? shipping.city: "" } , ${shipping.postalCode ? shipping.postalCode : ""}, ${shipping.country ? shipping.country : ""}
                        </div>
                        ${isDelivered ? `<div class='success'>Delivered at ${deliveredAt} </div>` : `<div class="error">Not Delivered</div>`}
                    </div>

                    <div>
                        <h2>Payment</h2>
                        <div>
                           Payment Method : ${payment.paymentMethod}
                        </div>
                        ${isPaid ? `<div class="success">Paid at ${paidAt}</div>` : `<div class="error">Not Paid</div>`}
                        
                    </div>

                    <div>
                        <ul class="cart-list-container">
                            <li>
                                <h2>Shopping Cart</h2>
                                <div>Price</div>
                            </li>

                            ${
                                orderItems.map(item =>`
                                    
                                        <li>
                                            <div class="cart-image">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>

                                            <div class="cart-name">

                                                <div>
                                                    <a href="/#/product/${item.Product}">${item.name}</a>
                                                </div>

                                                <div> Qty: ${item.qty}</div>

                                            </div>

                                            <div class="cart-price">$${item.price}</div>

                                        </li>
                                    `)
                            }
                        
                        
                        </ul>
                    
                    </div>
                
                
                </div>     
                
                <div class="order-action">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>                   
                        </li>

                        <li> <div>Items</div> <div>$${itemPrice}</div> </li>
                        <li> <div>Shipping</div> <div>$${shippingPrice}</div> </li>
                        <li> <div>Tax</div> <div>$${taxPrice}</div> </li>
                        <li class="total"> <div>Order Total</div> <div>$${totalPrice}</div> </li>
                        <li><div class="fw" id="paypal-button"></div></li>
                        <li>
                              ${isPaid && !isDelivered && isAdmin ? `<button id="deliver-order-button" class="primary fw">Deliver Order</button>`: '' }
                        </li>
                        
                    </ul>
                
                
                
                </div>


            </div>
        
        
        
        `
    }

}


export default OrderScreen