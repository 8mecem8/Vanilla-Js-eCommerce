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
                  ? `<a class="route-link" href='/#/profile'>${name}</a>`
                  : `<a class="route-link" href="/#/Signin">Sign-in</a>`
                 }
                
                <a class="route-link" href="/#/Cart"><img src="https://www.bestbuy.com/~assets/bby/_com/shop/cart-icon/dist/client/images/1905cd7135529612f63c727e038008c3.svg" alt="cart icon">Cart</a>
            </div>
        
        
        
        
        
              `

    },


    aRender: () =>
    {



    }

} 


export default Header