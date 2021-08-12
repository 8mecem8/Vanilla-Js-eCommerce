import { getUserInfo } from "../Sup-files/Util"

const Header =
{
    render: async() =>
    {

        const {name} = await getUserInfo()
        //console.log('userInfo is in the header screen',name)

        return`
        
            <div>
                <a class="logo" href="/">Buyozon</a>
            </div>
            <div>
                ${name 
<<<<<<< HEAD
                  ? `<a class="route-link" href='/#/profile'>${name} <i class="fas fa-user-circle"></i></i></a>`
                  : `<a class="route-link" href="/#/Signin">Sign-in</a>`
                 }
                
                <a class="route-link" href="/#/Cart"><img src="https://www.bestbuy.com/~assets/bby/_com/shop/cart-icon/dist/client/images/1905cd7135529612f63c727e038008c3.svg" alt="cart icon" />Cart</a>
                ${name 
                  ? `<a class="route-link" id="logout" href='/'><i class="fas fa-sign-out-alt"></i></i></a>`
                  : ``
                 }
=======
                  ? `<a class="route-link" href='/#/profile'>${name}</a>`
                  : `<a class="route-link" href="/#/Signin">Sign-in</a>`
                 }
                
                <a class="route-link" href="/#/Cart"><img src="https://www.bestbuy.com/~assets/bby/_com/shop/cart-icon/dist/client/images/1905cd7135529612f63c727e038008c3.svg" alt="cart icon">Cart</a>
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d
            </div>
        
        
        
        
        
              `

    },


    aRender: () =>
    {

<<<<<<< HEAD
        if(document.getElementById('logout')){
        document.getElementById('logout').addEventListener('click',(e)=>{
            //e.preventDefault()
            
            window.localStorage.removeItem('loggedappUser')
            document.location.hash = "/"
        })}
=======
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d


    }

} 


export default Header