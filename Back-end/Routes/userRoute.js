const userRouter = require('express').Router()


const userModel = require('../Models/userModel')
const jwt = require('jsonwebtoken')


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








userRouter.post('/register', async (req, res, next)=>
{

    console.log(req.body)
    try         {
                    const newUser = new userModel(
                        {
                            name : req.body.name,
                            email : req.body.email,
                            password : req.body.password,
                            
                        })

                        const createdUser = await newUser.save()

                        //console.log("createdUser is =====>>>>",createdUser)

                        if(!createdUser){res.send({message:'İnvalid User Data'})}
                        else{
                                //console.log('process.env.SECRET is ====>>>',process.env.SECRET)
                            const token = jwt.sign({_id: createdUser._id,name: createdUser.name,email: createdUser.email,
                                                     isAdmin: createdUser.isAdmin,},process.env.SECRET);
                            
                            res.status(200)
                                .send({
                                        _id: createdUser._id,
                                        name: createdUser.name,
                                        email: createdUser.email,
                                        isAdmin: createdUser.isAdmin,
                                        token: token
                                        
                                      })
                        
                            }
                        

                }
    catch(err)  {
                    next(err)
                }

})








userRouter.put('/:id', async (req, res, next)=>
{

    const user = await  userModel.findById(req.params.id)

    

    

    try        

     {
                
                        if(!user){res.send({message:'User Not Found'})}
                        else{

                            const authorization = req.headers.authorization.substring(7)
                            
                            const decodedToken = jwt.verify(authorization, process.env.SECRET)
                            //console.log(decodedToken)

                            if (!decodedToken) {return res.send({message:'token missing or invalid' })}





                            const updateUser = 
                        {
                            name : req.body.name,
                            email : req.body.email,
                            password : req.body.password,
                            
                        }

                        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,updateUser, { new: true })

                        
                                //console.log('process.env.SECRET is ====>>>',process.env.SECRET)
                            const token = jwt.sign({_id: updatedUser._id,name: updatedUser.name,email: updatedUser.email,
                                                     isAdmin: updatedUser.isAdmin,},process.env.SECRET);
                            
                            res.status(200)
                                .send({
                                        _id: updatedUser._id,
                                        name: updatedUser.name,
                                        email: updatedUser.email,
                                        isAdmin: updatedUser.isAdmin,
                                        token: token
                                        
                                      })
                        
                            }
                        

    }
    catch(err)  {
                    next(err)
                }

})










module.exports = userRouter