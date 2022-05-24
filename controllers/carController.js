require ('../models/database')
const { name } = require('ejs');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const Car=require('../models/carModel');
const User  = require('../models/User')
const bcrypt = require('bcrypt');
const morgan = require('morgan');
//const e = require('connect-flash');


var sessionChecker= async (req, res, next)=>{
    //console.log(req)
    if(req.cookies.user_sid && !req.session.user){
        const cars = await Car.find({})
        res.render('car_data', { session: req.session.user, cars: {cars}})
    }else {
        next()
    }


}

exports.HomePage= async (req, res) =>{
    const cars = await Car.find({})
    console.log(cars)
    res.render('index', { session: req.session.user, cars: {cars}});

}
exports.AboutPage= async (req, res) =>{
    const cars = await Car.find({})
    console.log(cars)
    res.render('about', { session: req.session.user, cars: {cars}});

}


// create form view
exports.CreatePage = (sessionChecker, (req, res) =>{

    if(!req.cookies.user_sid && req.session.user){
        res.render('login', {user: req.user,session: req.session.user})
    }else {
        res.render('create_car',{ session: req.session.user})
    }


})

// submit form (store data in database)
exports.CreateCar= async (req, res)=>{

   //console.log(req.body);
    let name =req.body.name
    let email =req.body.email
    if(email !=''&& name !=''){
        const car = new Car({
            name:name,
            email:email
        })
            car.save()
        }else{
    }
    console.log('car data created')
    const cars = await Car.find({})
    res.render('car_data', { session: req.session.user,cars: {cars}});
}

// Edit Student
exports.UpdateCarPage= async (req, res)=>{
    console.log(req.params.id);
    const id = req.params.id;
    const car = await Car.findById({_id:id})
    res.render('edit_car', { session: req.session.user,car: {car}});

}
// Edit Student Action
exports.UpdateCar=async (req, res)=>{

    try {
        const car = await Car.updateOne({_id:req.params.id, name:req.body.name, email:req.body.email})
        console.log(car)
        const cars = await Car.find({})
        res.render('car_data', { session: req.session.user,students: {cars}})
    } catch (error) {
        console.log(error)

    }
}


// Delete
exports.DeleteCar=async(req, res)=>{
    if(!req.cookies.user_sid && req.session.user){
        res.render('login',{ session: req.session.user})
    }
    console.log(req.params.id);
    const id = req.params.id;
    const car =await Car.deleteOne({ _id: id });
    console.log(car);
    const cars = await Car.find({})
    res.render('car_data', { session: req.session.user,cars: {cars}})

}

//

// create form view
exports.RegisterPage=(req, res)=>{

    res.render('register',{ session: req.session.user });
}
//User
exports.RegisterUser= async (req,res)=>{
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    const hash = bcrypt.hashSync(req.body.password, salt);
// Store hash in your password DB.
    console.log(req.body)
    //User.findOne({email:req.body.email}).then((User)); {
    const user = await User.findOne({email:req.body.email})
    if (user){
        console.log(user)
        return res.status(400).json({email: "A user already registered"})
    }else {
// or create new user
        const newUser =new User({
            userName:req.body.name,
            email:req.body.email,
            password: hash,

        });
            newUser.save()
            res.render("login", {  session: req.session.user})
        }

    //Login

    }

    exports.LoginPage = async (req,res)=>{
        res.render('login',{ session: req.session.user});

    }

    exports.LoginUser = async (req,res)=>{

        const user =  await User.findOne({email:req.body.email})

        if (!user){
            res.render('login', { session: req.session.user})
        }

        await user.comparePassword(req.body.password, async(error,match)=>{
            const cars = await Car.find({})
            if (!match){
                res.render("login", {  session: req.session.user})
            }
            req.session.user = user
            res.render('car_data', {  session: req.session.user, cars:{cars}})
        })
    }

       //logout

    exports.LogoutUser= async(req,res)=>{
        console.log(req.cookies.user_sid)
        if(req.cookies.user_sid && req.session.user){
            res.clearCookie('user_sid')
               //res.session.destroy()
            res.redirect('./login' /*, { session: req.session.user}*/)
        }else{
            res.redirect('./login')
        }
        }
