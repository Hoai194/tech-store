import express from 'express'
import { placeOrder, placeOrderStripe, getAllOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

// Admin
orderRouter.post('/list', adminAuth , getAllOrders)
orderRouter.post('/status', adminAuth , updateStatus)


// Payment
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe', authUser , placeOrderStripe)



//User

orderRouter.post('/userorders', authUser, userOrders)

//Verify
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter
