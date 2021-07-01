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