const express = require('express');
const router = express.Router()

const carController = require('../controllers/carController')

/** Car Routes  */
router.get('/', carController.HomePage);
router.get('/create_car', carController.CreatePage);
router.post('/create_car', carController.CreateCar);

router.get('/about', carController.AboutPage);

// Update
router.get('/edit_car/:id', carController.UpdateCarPage);
router.post('/edit_car/:id', carController.UpdateCar);



//Delete
router.get('/delete_car/:id', carController.DeleteCar);

//register

//router.get('/', carController.HomePage);
router.get('/register', carController.RegisterPage);
router.post('/register', carController.RegisterUser);

//login
//router.get('/', carController.HomePage);
router.get('/login', carController.LoginPage);
router.post('/login', carController.LoginUser);

//logout
router.get('/logout', carController.LogoutUser);
module.exports=router