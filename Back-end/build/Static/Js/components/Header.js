import { getUserInfo } from "../Sup-files/Util.js"

const Header =
{
    render: async() =>
    {

        const {name,isAdmin} = await getUserInfo()
        //console.log('userInfo is in the header screen',isAdmin)

        return`
        
            <div>
                <a class="logo" href="/">Buyozon</a>
            </div>
            <div>
                ${name 
                  ? `<a class="route-link" href='/#/profile'>${name} <i class="fas fa-user-circle"></i></i></a>`
                  : `<a class="route-link" href="/#/Signin">Sign-in</a>`
                 }
                
                <a class="route-link" href="/#/Cart"><img src="https://www.bestbuy.com/~assets/bby/_com/shop/cart-icon/dist/client/images/1905cd7135529612f63c727e038008c3.svg" alt="cart icon" />Cart</a>
                
                ${isAdmin 
                  ? `<a class="route-link" href='/#/dashboard'>Dashboard</a>`
                  : ``
                 }
                

                ${name 
                  ? `<a class="route-link" id="logout" href='/'><i class="fas fa-sign-out-alt"></i></i></a>`
                  : ``
                 }
            </div>
        
        
        
        
        
              `

    },


    aRender: () =>
    {

        if(document.getElementById('logout')){
        document.getElementById('logout').addEventListener('click',(e)=>{
            //e.preventDefault()
            
            window.localStorage.removeItem('loggedappUser')
            document.location.hash = "/"
        })}


    }

} 


export default Header