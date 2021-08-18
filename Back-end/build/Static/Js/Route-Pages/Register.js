import { getUserInfo, hideLoading, setUserInfo, showLoading, registera, showMessage, redirectUser } from '../Sup-files/Util.js'



const Register =
{
    aRender: ()=>
    {
        document.getElementById('register-form')
        .addEventListener('submit', async (e)=>
                        {
                            e.preventDefault()

                            showLoading()

                            const data = await registera({
                                                        name: document.getElementById('registerInputNAme1').value,
                                                        email: document.getElementById('registerInputEmail1').value,
                                                        password: document.getElementById('registerInputPassword1').value
                                                      })


                            
                            
                            hideLoading()                            
                            if(data.message){showMessage(data.message)}
                            else{
                                setUserInfo(data)

                                redirectUser()
                                }


                        })                              
    },

    render: async ()=>
    {       
            const getlocaldata = await getUserInfo()
            
            if(getlocaldata.name){redirectUser()}
               

            return`

                                
                        <div class="form-container">
                                    <h1 class="createAcc">Create an account</h1>
                                    <form id="register-form">

                                            <div class="mb-3">
                                                <label for="registerInputEmail1" class="form-label">Name</label>
                                                <input type="text" class="form-control" id="registerInputNAme1" aria-describedby="emailHelp" placeholder="John Carter">
                                                <div id="emailHelp" class="form-text">Please enter your Name.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="registerInputEmail1" class="form-label">Email address</label>
                                                <input type="email" class="form-control" id="registerInputEmail1" aria-describedby="emailHelp" placeholder="example@example.com">
                                                <div id="emailHelp" class="form-text">Please enter your E-mail.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="registerInputPassword1" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="registerInputPassword1" placeholder="Pa$$VvoRd1234">
                                                <div id="passwordHelp" class="form-text">Please enter your Password.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="registerInputPassword1" class="form-label">Re-enter Your Password</label>
                                                <input type="password" class="form-control" id="registerInputRePassword1" placeholder="Pa$$VvoRd1234">
                                                <div id="passwordHelp" class="form-text">Please re-enter your Password.</div>
                                            </div>



                                            
                                            <button type="submit" class="btn btn-primary primary fw">Register</button>
                                    </form>
                                        <a href="/#/signin" class="createaccount"> Already Have an account ?</a>
                        
                        
                        </div>
            
            
            
            
            
            
            
            
            
                    `
    }

}



export default Register