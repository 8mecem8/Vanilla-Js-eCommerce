<<<<<<< HEAD
import Rating from "../components/Rating.js"


const fetchedData = async () =>
{
const response = await fetch('http://localhost:5000/api/products')
const data = await response.json()
    //console.log(data) //return JSON.parse(data)
    return await data
}


const prlist = await fetchedData()


//console.log(prlist)

const home =
{
    render:  async () =>
    {   
        return `
        <ul class="products">
            ${ await prlist.map(at=>
                {  //console.log(at)
                  
=======
import data from '../Sup-files/data.js'

const prlist = data.products


const home =
{
    render: () =>
    {
        return `
        <ul class="products">
            ${prlist.map(at=>
                {
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
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

<<<<<<< HEAD
                            
                                <div class="product-rating">
                                    ${Rating.render({value: at.rating, text: `${at.numReviews} reviews`})}
                                </div>
                            

=======
>>>>>>> 516093ab7d234b338de922cdf9aeccfba7d317a6
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