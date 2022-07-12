const express = require('express')
const app = express()
const cors = require("cors")

// importing config file where all variables are stored 
require('./db/config')

// importing models
const User = require('./db/User')
const Product = require('./db/Product')

const Jwt = require('jsonwebtoken');
const jwtKey='e-com'

// using middleware. Middleware functions are functions that have access to the request object ( req ), the response object ( res ), and the next middleware function in the application's request-response cycle.
app.use(express.json())

// using cors to handle unexpected errors from frontend.
app.use(cors())


app.post("/register", async (req,res)=>{
    let  user = new User(req.body);// putting the object from front end which is inputed by user.
    let  result = await user.save();// saving the result 
    result = result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey, {expiresIn:"2h"},(err, token)=>{
        if(err){
            res.send({result:"Something went wrong. Please try again after some times"})
        }
        res.send({result,auth: token})
    })
    // res.send(result); // sending the result to postman
})

app.post("/login", async (req,res)=>{
    if(req.body.email && req.body.password)
    {
        const user = await User.findOne(req.body).select("-password")
        if(user){
            Jwt.sign({user}, jwtkey, {expiresIn:"2h"},(err, token)=>{
                if(err){
                    res.send({result:"Something went wrong. Please try again after some times"})
                }
                res.send({user,auth: token})
            })
        }else{
            res.send({result:"No user found"})
        }
    }
    else{
        res.send({result:"No user found"})
    }
    
    
})

app.get('/',(req,res)=>{
    res.send('app is working')//sending to screen
})

app.post("/add-product",verifyToken, async (req, res)=>{
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

app.get("/products",verifyToken, async(req,res)=>{
    let product = await Product.find();
    if(product.length > 0){
        res.send(product)
    }else{
        res.send({result:"No product found"})
    }
})

app.delete("/product/:id",verifyToken, async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id})
    res.send(result)
})
app.get("/product/:id",verifyToken, async (req,res)=>{
    const result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"No record found"})
    }
})
app.put("/product/:id",verifyToken, async(req, res)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set : req.body
        }
    )
    res.send(result)
})

app.get("/search/:key",verifyToken, async(req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {catagory:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})

function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        console.warn("middleware called", token)
        Jwt.verify(token, jwtKey,(err, key)=>{
            if(err){
                res.status(401).send({result: 'please provide valid token'})
            }else{
                next();
            }
        })
    }else{
        res.status(403).send({result: 'please add token with header'})
    }
    
    next();
}

app.listen(5000)

// const mongoDB = async ()=>{
//     mongoose.connect('mongodb://localhost:27017/souvikkart');
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model('items',productSchema)
//     const data = await product.find();
//     console.warn(data);
// }
// mongoDB(); 
