import Home from '../Js/Route-Pages/Home.js'
import Header from './components/Header.js'
import Cart from './Route-Pages/Cart.js'
import Error404 from './Route-Pages/Error404.js'
import Profile from './Route-Pages/Profile.js'
import Register from './Route-Pages/Register.js'
import Shipping from './Route-Pages/Shipping.js'
import Signin from './Route-Pages/Signin.js'
import Single from './Route-Pages/SingleProduct.js'
import { parseRequestUrl } from './Sup-files/Util.js'

import '../Css/sePePl.css'
import Payment from './Route-Pages/Payment.js'
import PlaceOrderScreen from './Route-Pages/PlaceOrder.js'
import OrderScreen from './Route-Pages/Order.js'



const routes =
{
    "/": Home,
    "/product/:id": Single,
    "/order/:id": OrderScreen,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": Signin,
    "/register": Register,
    "/profile": Profile,
    "/shipping": Shipping,
    "/payment": Payment,
    "/placeorder": PlaceOrderScreen,


}



const router = async () =>
{
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/")+(request.id || Number.isInteger(+request.id) ? "/:id" : "" )+(request.verb ? `/${request.verb}` : "")
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404


    //console.log(request.id)
    //console.log(routes)
    //console.log('screen.aRender',screen.render)
    //console.log(parseUrl)

    const header = document.getElementById('header-container')
    header.innerHTML = await Header.render();await Header.aRender()



    const main = document.querySelector('.main-container')
    main.innerHTML = await screen.render(); if(screen.aRender){await screen.aRender()}
    
    
}

router()


window.addEventListener('load',router)

window.onhashchange = router



