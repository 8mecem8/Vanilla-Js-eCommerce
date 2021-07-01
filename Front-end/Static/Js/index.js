import Home from '../Js/Route-Pages/Home.js'
import Error404 from './Route-Pages/Error404.js'
import Single from './Route-Pages/SingleProduct.js'
import { parseRequestUrl } from './Sup-files/Util.js'







const routes =
{
    "/": Home,
    "/product/:id": Single,
}



const router = () =>
{
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : "/")+(request.id && Number.isInteger(+request.id) ? "/:id" : "" )+(request.verb ? `/${request.verb}` : "")
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404

    

    const main = document.querySelector('.main-container')
    main.innerHTML = screen.render()
    
}

window.addEventListener('load',router)

window.onhashchange = router