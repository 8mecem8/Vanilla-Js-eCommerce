import DBoardMenu from "../components/DBoardMenu.js"
import { getorders, hideLoading, rerender, showLoading, showMessage,deleteOrder } from "../Sup-files/Util.js";


const OrderList =
{
    aRender: ()=>
    {



        
         const editButtons = document.getElementsByClassName("edit-button");
         Array.from(editButtons).forEach((e) => {
           e.addEventListener("click", () => {
             document.location.hash = `/order/${e.id}`;
           });
         });
        






         const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
            

      deleteButton.addEventListener('click', async () => {


        if (confirm('Are you sure to delete this order?')) {


          showLoading();


          const data = await deleteOrder(deleteButton.id);


          if (data.error) {
            showMessage(data.error);
          } else { 
            rerender(OrderList);
          }
          hideLoading();
        }
      });
    });


    },
    
    render: async ()=>
    {


        const orders = await getorders()
        

        return `
        
       <div class="dashboard">
            ${await DBoardMenu.render({ selected: "orders" })}

            <div class="dashboard-content">

                <h1>Product List</h1>

                
                    <div class="order-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>USER</th>
                                    <th>PAİD AT</th>
                                    <th>DELİVERED AT</th>
                                    <th class="tr-action">ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                ${orders
                                  .map((arg) => {
                                    return `
                                            <tr>
                                                <td>${arg._id}</td>
                                                <td>${arg.createdAt}</td>
                                                <td>${arg.totalPrice}</td>
                                                <td>${arg.user}</td>
                                                <td>${arg.paidAt || "NO"}</td>
                                                <td>${arg.deliveredAt || "NO"}</td>
                                                
                                                <td class="td-action">
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


export default OrderList