const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')

const userRouter = require('express').Router()

userRouter.post('/createadmin', async (req, res, next)=>
{

    console.log(req.body)
    try         {
                    const user = new userModel(
                        {
                            email : req.body.email,
                            name : req.body.name,
                            password : req.body.password,
                            isAdmin : true,
                        })

                        const createdUser = await user.save()

                        res.status(200).json(createdUser)

                }
    catch(err)  {
                    next(err)
                }

})





userRouter.post('/signin', async (req, res, next)=>
{

    console.log(req.body)
    try         {
                    const signinUser = await userModel.findOne(
                        {
                            email : req.body.email,
                            password : req.body.password,
                            
                        })

                        //console.log("signinUser is =====>>>>",signinUser)

                        if(!signinUser){res.send({message:'İnvalid Email or Password'})}
                        else{
                                //console.log('process.env.SECRET is ====>>>',process.env.SECRET)
                            const token = jwt.sign({_id: signinUser._id,name: signinUser.name,email: signinUser.email,
                                                     isAdmin: signinUser.isAdmin,},process.env.SECRET);
                            
                            res.status(200)
                                .send({
                                        _id: signinUser._id,
                                        name: signinUser.name,
                                        email: signinUser.email,
                                        isAdmin: signinUser.isAdmin,
                                        token: token
                                        
                                      })
                        
                            }
                        

                }
    catch(err)  {
                    next(err)
                }

})








module.exports = userRouter