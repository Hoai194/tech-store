import express from 'express'
import { addtoCart, updateCart, getUserCart } from '../controllers/cartController.js'
import productRouter from './productRoute.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

productRouter.post('/add',authUser, addtoCart)
productRouter.post('/update',authUser, updateCart)
productRouter.get('/user',authUser, getUserCart)

export default cartRouter
