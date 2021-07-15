import Home from '../Js/Route-Pages/Home.js'
import Header from './components/Header.js'
import Cart from './Route-Pages/Cart.js'
import Error404 from './Route-Pages/Error404.js'
import Signin from './Route-Pages/Signin.js'
import Single from './Route-Pages/SingleProduct.js'
import { parseRequestUrl } from './Sup-files/Util.js'



const routes =
{
    "/": Home,
    "/product/:id": Single,
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": Signin,
}



const router = async () =>
{
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/")+(request.id && Number.isInteger(+request.id) ? "/:id" : "" )+(request.verb ? `/${request.verb}` : "")
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404


    //console.log(request)
    //console.log(routes)
    //console.log('screen.aRender',screen.render)

    const header = document.getElementById('header-container')
    header.innerHTML = await Header.render();await Header.aRender()



    const main = document.querySelector('.main-container')
    main.innerHTML = await screen.render(); if(screen.aRender){await screen.aRender()}
    
    
}

router()


window.addEventListener('load',router)

window.onhashchange = router



