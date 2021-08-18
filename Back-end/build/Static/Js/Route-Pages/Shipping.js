import CheckoutSteps from '../components/CheckoutSteps.js'
import { getUserInfo, hideLoading, setUserInfo, showLoading, update, showMessage,getShipping, setShipping } from '../Sup-files/Util.js'



const Shipping =
{
    aRender: ()=>
    {
        document.getElementById('shipping-form')
        .addEventListener('submit', async (e)=>
                        {
                            e.preventDefault()

                            setShipping({
                                address: document.getElementById('address').value,
                                city: document.getElementById('city').value,
                                postalCode: document.getElementById('postalCode').value,
                                country: document.getElementById('country').value,
                            })

                            

                            document.location.hash = "/payment"
                        })                              
    },

    render: async ()=>
    {       
            const getlocaldata = await getUserInfo()
            
            if(!getlocaldata.name){ document.location.hash = "/"}
               

            const {address,city,postalCode,country} = await getShipping()

            return`

                    ${CheckoutSteps.render({step1: true,step2:true})}
                                
                        <div class="form-container">
                                    <h1 class="createAcc">Shipping Address</h1>
                                    <form id="shipping-form">

                                            <div class="mb-3">
                                                <label for="address" class="form-label">Address</label>
                                                <input type="text" class="form-control" id="address" aria-describedby="emailHelp" value="${address}">
                                                <div id="emailHelp" class="form-text">Please enter your Address.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="city" class="form-label">City</label>
                                                <input type="text" class="form-control" id="city" aria-describedby="emailHelp" value="${city}">
                                                <div id="emailHelp" class="form-text">Please enter your City.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="postalCode" class="form-label">Postal Code</label>
                                                <input type="text" class="form-control" id="postalCode" aria-describedby="emailHelp" value="${postalCode}">
                                                <div id="emailHelp" class="form-text">Please enter your Postal Code.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="country" class="form-label">Country</label>
                                                <input type="text" class="form-control" id="country" aria-describedby="emailHelp" value="${country}">
                                                <div id="emailHelp" class="form-text">Please enter your Country.</div>
                                            </div>
                                            



                                            
                                            <button type="submit" class="btn btn-primary primary fw">Continue</button>
                                    </form>
                                        
                        
                        
                        </div>
            
            
            
            
            
            
            
            
            
                    `
    }

}



export default Shipping