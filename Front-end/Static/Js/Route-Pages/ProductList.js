import DBoardMenu from "../components/DBoardMenu"
import { getProducts } from "../Sup-files/Util"


const ProductList =
{
    aRender: ()=>
    {

        

    },
    
    render: async ()=>
    {
 
        const products = await getProducts()


        return `
        
       <div class="dashboard">
            ${await DBoardMenu.render({ selected: "products" })}

            <div class="dashboard-content">

                <h1>Product List</h1>

                    <a id="create-product-button" class="primary" href="/#/createproduct">Create Product</a>
                    <br>
                    <br>

                    <div class="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th class="tr-action">ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${products
                                  .map((arg) => {
                                    return `
                                            <tr>
                                                <td>${arg._id}</td>
                                                <td>${arg.name}</td>
                                                <td>${arg.price}</td>
                                                <td>${arg.catagory}</td>
                                                <td>${arg.brand}</td>
                                                <td>
                                                    <button id="${arg._id}" class="edit-button">Edit</button>
                                                    <button id="${arg._id}" class="edit-button">Delete</button>
                                                </td>
                                            </tr>
                                        
                                        `;
                                  })
                                  .join("\n")}

                            </tbody>
                        
                        </table>
                    
                    </div>


            
            </div>
        </div>

        `;
    }

}


export default ProductList