import Home from '../Js/Route-Pages/Home.js'
<<<<<<< HEAD
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



=======
<<<<<<< HEAD
import Header from './components/Header.js'
import Cart from './Route-Pages/Cart.js'
import Error404 from './Route-Pages/Error404.js'
import Signin from './Route-Pages/Signin.js'
=======
import Error404 from './Route-Pages/Error404.js'
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
import Single from './Route-Pages/SingleProduct.js'
import { parseRequestUrl } from './Sup-files/Util.js'



<<<<<<< HEAD
=======




>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d
const routes =
{
    "/": Home,
    "/product/:id": Single,
<<<<<<< HEAD
    "/order/:id": OrderScreen,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": Signin,
    "/register": Register,
    "/profile": Profile,
    "/shipping": Shipping,
    "/payment": Payment,
    "/placeorder": PlaceOrderScreen,


=======
<<<<<<< HEAD
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": Signin,
=======
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d
}



<<<<<<< HEAD
const router = async () =>
{
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/")+(request.id || Number.isInteger(+request.id) ? "/:id" : "" )+(request.verb ? `/${request.verb}` : "")
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404


    //console.log(request.id)
    //console.log(routes)
    //console.log('screen.aRender',screen.render)
    //console.log(parseUrl)
=======
<<<<<<< HEAD
const router = async () =>
=======
const router = () =>
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
{
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/")+(request.id && Number.isInteger(+request.id) ? "/:id" : "" )+(request.verb ? `/${request.verb}` : "")
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404

<<<<<<< HEAD

    //console.log(request)
    //console.log(routes)
    //console.log('screen.aRender',screen.render)
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d

    const header = document.getElementById('header-container')
    header.innerHTML = await Header.render();await Header.aRender()



    const main = document.querySelector('.main-container')
    main.innerHTML = await screen.render(); if(screen.aRender){await screen.aRender()}
    
    
}

router()


window.addEventListener('load',router)

window.onhashchange = router



<<<<<<< HEAD
=======
=======
    

    const main = document.querySelector('.main-container')
    main.innerHTML = screen.render()
    
}

window.addEventListener('load',router)

window.onhashchange = router
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d
