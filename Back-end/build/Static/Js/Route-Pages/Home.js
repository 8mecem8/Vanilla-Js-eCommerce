import Rating from "../components/Rating.js"
import { getProducts, showMessage } from "../Sup-files/Util.js"



const home =
{
    render:  async () =>
    {   
        const prlist = await getProducts()
            

        return `
        <ul class="products">
            ${ await prlist.map(at=>
                {  //console.log(at)
                  
                return`
                    <li>
                        <div class="product">
                            <a href="/#/product/${at._id}">
                                <img src=${at.image} alt=${at.name} />
                            </a>

                            <div class="product-name">
                                <a href="/#/product/${at._id}">
                                    ${at.name}
                                </a>
                            </div>

                            
                                <div class="product-rating">
                                    ${Rating.render({value: at.rating, text: `${at.numReviews} reviews`})}
                                </div>
                            

                            <div class="product-brand">
                                ${at.brand}
                            </div>

                            <div class="product-price">
                                $${at.price}
                            </div>
                        </div>
                    </li>
                
                
                
                `
                 }).join('\n')
            }
                   
        `
    }
}

export default home