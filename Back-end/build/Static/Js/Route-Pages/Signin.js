import { getUserInfo, hideLoading, setUserInfo, showLoading, signina, showMessage, redirectUser } from '../Sup-files/Util.js'



const Signin =
{
    aRender: ()=>
    {
        document.getElementById('signin-form')
        .addEventListener('submit', async (e)=>
                        {
                            e.preventDefault()

                            showLoading()

                            const data = await signina({
                                                        email: document.getElementById('exampleInputEmail1').value,
                                                        password: document.getElementById('exampleInputPassword1').value
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
                                    <form id="signin-form">
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label">Email address</label>
                                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="example@example.com">
                                                <div id="emailHelp" class="form-text">Please enter your E-mail.</div>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Pa$$VvoRd1234">
                                                <div id="passwordHelp" class="form-text">Please enter your Password.</div>
                                            </div>
                                            
                                            <button type="submit" class="btn btn-primary primary fw">Signin</button>
                                    </form>
                                        <a href="/#/register" class="createaccount"> Create your account</a>
                        
                        
                        </div>
            
            
            
            
            
            
            
            
            
                    `
    }

}



export default Signin