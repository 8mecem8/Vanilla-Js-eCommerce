import CheckoutSteps from '../components/CheckoutSteps.js'
import { getUserInfo, hideLoading, setUserInfo, showLoading, update, showMessage,getPayment, setPayment } from '../Sup-files/Util.js'



const Payment =
{
    aRender: ()=>
    {
        document.getElementById('payment-form')
        .addEventListener('submit', async (e)=>
                        {
                            e.preventDefault()


                            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').calue



                            setPayment({
                               paymentMethod
                            })

                            

                            document.location.hash = "/placeorder"
                        })                              
    },

    render: async ()=>
    {       
            const getlocaldata = await getUserInfo()
            
            if(!getlocaldata.name){ document.location.hash = "/"}
               

            

            return`

                    ${CheckoutSteps.render({step1: true,step2:true,step3:true})}
                                
                        <div class="form-container a-payment">
                                    <h1 class="createAcc">Payment Method</h1>
                                    <form id="payment-form">

                                            <div class="mb-3">
                                                <input type="radio" name="payment-method" id="paypal" value="Paypal" checked>
                                                <label for="paypal" class="form-label">Paypal</label>
                                            </div>
                                            <div class="mb-3">
                                            <input type="radio" name="payment-method"  id="stripe" value="stripe">
                                            <label for="stripe" class="form-label">Stripe</label>
                                            <div id="emailHelp" class="form-text">Please choose one</div>
                                            </div>
                                            
                                            



                                            
                                            <button type="submit" class="btn btn-primary primary fw">Continue</button>
                                    </form>
                                        
                        
                        
                        </div>
            
            
            
            
            
            
            
            
            
                    `
    }

}



export default Payment