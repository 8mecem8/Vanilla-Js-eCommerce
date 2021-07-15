import Home from '../Js/Route-Pages/Home.js'
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
const routes =
{
    "/": Home,
    "/product/:id": Single,
<<<<<<< HEAD
    "/cart/:id": Cart,
    "/cart": Cart,
    "/signin": Signin,
=======
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
}



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

    const header = document.getElementById('header-container')
    header.innerHTML = await Header.render();await Header.aRender()



    const main = document.querySelector('.main-container')
    main.innerHTML = await screen.render(); if(screen.aRender){await screen.aRender()}
    
    
}

router()


window.addEventListener('load',router)

window.onhashchange = router



=======
    

    const main = document.querySelector('.main-container')
    main.innerHTML = screen.render()
    
}

window.addEventListener('load',router)

window.onhashchange = router
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
