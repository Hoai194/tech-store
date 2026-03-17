import userModel from '../models/userModel.js'

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { itemId, size } = req.body

        if (!itemId || !size) {
            return res.json({ success: false, message: 'itemId and size are required' })
        }

        const userId = req.userId
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        let cartData = userData.cartData || {}

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = { [size]: 1 }
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Added to cart' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update cart
const updateCart = async (req, res) => {
    try {
        const { itemId, size, quantity } = req.body

        if (!itemId || !size || quantity == null) {
            return res.json({ success: false, message: 'Missing fields' })
        }

        if (quantity < 0) {
            return res.json({ success: false, message: 'Quantity cannot be negative' })
        }

        const userId = req.userId
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        let cartData = userData.cartData || {}

        if (!cartData[itemId] || !cartData[itemId][size]) {
            return res.json({ success: false, message: 'Item not found in cart' })
        }

        if (quantity === 0) {
            delete cartData[itemId][size]
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId]
            }
        } else {
            cartData[itemId][size] = quantity
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: 'Cart updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: 'User not found' })
        }

        const cartData = userData.cartData || {}
        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addToCart, updateCart, getUserCart }
