import { getUserInfo, hideLoading, setUserInfo, showLoading, update, showMessage, getMyOrders } from '../Sup-files/Util.js'



const Profile =
{
    aRender: ()=>
    {
        document.getElementById('register-form')
        .addEventListener('submit', async (e)=>
                        {
                            e.preventDefault()

                            showLoading()

                            const userInfo = await getUserInfo()

                            const data = await update({
                                                        name: userInfo.name,
                                                        email: document.getElementById('profileInputEmail1').value,
                                                        password: document.getElementById('profileInputPassword1').value
                                                      })


                            
                            
                            hideLoading()                            
                            if(data.message){showMessage(data.message)}
                            else{
                                setUserInfo(data)

                                document.location.hash = "/"
                                }


                        })                              
    },

    render: async ()=>
    {       
            const getlocaldata = await getUserInfo()
            
            if(!getlocaldata.name){ document.location.hash = "/"}
               



            const orders = await getMyOrders()


            //console.log("orders in profile.js is ====>",orders)
            

            return`


    <div class="content profile">
                    <div class="profile-info">
                                
                        <div class="form-container">
                                    <h1 class="createAcc">User Account</h1>
                                    <form id="register-form">

                                            <div class="mb-3">
                                                <label for="registerInputEmail1" class="form-label">Name: ${getlocaldata.name}</label>
                                               
                                            </div>
                                            <div class="mb-3">
                                                <label for="registerInputEmail1" class="form-label">Email address</label>
                                                <input type="email" class="form-control" id="profileInputEmail1" aria-describedby="emailHelp" value="${getlocaldata.email}">
                                                <div id="emailHelp" class="form-text">To change edit your E-mail.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="registerInputPassword1" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="profileInputPassword1" placeholder="Pa$$VvoRd1234">
                                                <div id="passwordHelp" class="form-text">To change enter your Password.</div>
                                            </div>
                                           



                                            
                                            <button type="submit" class="btn btn-primary primary fw">Update</button>
                                    </form>
                                        
                        
                        
                        </div>
            
                    </div>
            
            
                    <div class="profile-orders">
                        <h2>Order History</h2>
                             <table>
                                        <thead>
                                            <tr>
                                            <th>ORDER ID</th>
                                            <th>DATE</th>
                                            <th>TOTAL</th>
                                            <th>PAID</th>
                                            <th>DELIVERED</th>
                                            <th>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                               ${
                                                orders.length === 0 
                                                    ? `<tr><td colspan="6">No Order Found.</tr>`
                                                    : orders
                                                        .map(
                                                        (order) => `
                                            <tr>
                                                <td>${order._id}</td>
                                                <td>${order.createdAt}</td>
                                                <td>${order.totalPrice}</td>
                                                <td>${order.paidAt || 'No'}</td>
                                                <td>${order.deliveryAt || 'No'}</td>
                                                <td><a href="/#/order/${order._id}">DETAİLS</a> </td>
                                            </tr>
                                            `
                                                        )
                                                        .join('\n')
                                                }
                                        </tbody>
                             </table>
                    </div>
    </div>
            
            
            
            
                    `
    }

}



export default Profile