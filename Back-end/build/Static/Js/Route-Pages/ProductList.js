import DBoardMenu from "../components/DBoardMenu.js"
import { deleteProduct, getProducts, hideLoading, rerender, showLoading, showMessage } from "../Sup-files/Util.js"


const ProductList =
{
    aRender: ()=>
    {




         const editButtons = document.getElementsByClassName("edit-button");
         Array.from(editButtons).forEach((e) => {
           e.addEventListener("click", () => {
             document.location.hash = `/product/${e.id}/edit`;
           });
         });
        






         const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
            

      deleteButton.addEventListener('click', async () => {


        if (confirm('Are you sure to delete this product?')) {


          showLoading();


          const data = await deleteProduct(deleteButton.id);


          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(ProductList);
          }
          hideLoading();
        }
      });
    });








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
                                                    <button id="${arg._id}" class="delete-button">Delete</button>
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