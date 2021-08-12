<<<<<<< HEAD
import { parseRequestUrl } from '../Sup-files/Util.js'
import axios from "axios"
import Rating from "../components/Rating.js"
=======
<<<<<<< HEAD
import { parseRequestUrl } from '../Sup-files/Util.js'
import axios from "axios"
import Rating from "../components/Rating.js"
=======
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d


const Single =
{
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d

aRender: async ()=>
    {
    const req = parseRequestUrl()


    document.getElementById("add-button").addEventListener('click', () =>
                                                            {
                                                                window.location.hash = `/cart/${req.id}`
                                                            })

    },    
render: async()=>
    {
        const request = parseRequestUrl()
        const reqNum = request.id
        //console.log(request)
        const reProduct = await axios.get(`http://localhost:5000/api/products/${reqNum}`).then(at => at).catch(err => err)
        
        
        if(reProduct.response?.data){return`<div><h1>${reProduct.response.status} ${Object.values(reProduct.response.data)}</h1></div>`}
        

        

        return`
        <div class="container">
            <div class="back-to-result">
            <a href="/#/">Back to results</a>
            </div>

            <div class="Details">
                <div class="Details-image"> <img src="${reProduct.data.image}"/> </div>
                <div class="Details-info">
                    <ul>
                        <li>
                            <h1>${reProduct.data.name}</h1>
                        </li>

                        <li>
                            ${Rating.render({value: reProduct.data.rating, text: `${reProduct.data.numReviews} reviews`})}
                        </li>

                        <li>
                            Price: <strong>$${reProduct.data.price}</strong>
                        </li>

                        <li>
                            Description:<div>${reProduct.data.description}</div>
                        </li>
                    </ul>                
                </div>

                <div class="Details-action">
                    <ul>
                        <li>
                            Price: $${reProduct.data.price}
                        </li>

                        <li>
                            Status: ${reProduct.data.countInStock > 0 ? `<span class="success">In Stock</span>` : `<span class="error">Unavailable</span>`}
                        </li>

                        <li>
                            <button id="add-button" class="fw primary">Add to Cart</button>
                        </li>
                    </ul>          
                </div>


            </div>

        </div>`
<<<<<<< HEAD
=======
=======
render:() =>
    {
        return`<div> Single Product Page</div>`
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
>>>>>>> 52a9bc4e1fb7615b12579046297faf5182a4d62d

    }
}

export default Single