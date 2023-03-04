const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: [true, 'please enter the product name'],
        },
        price: {
            type: Number,
            required: [true, 'Please enter price'],
            default: 0.0,
        },
        Quntity: {
            type: Number,
            required: true,
        },
        brand: {
            type: String,
        },
        model: {
            type: String,
        },
        categories: {
            type: String,
        },
        description: {
            type: String,
        },
        ratings: {
            type: Number,
            default: 0,
        },
        images: [
            {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            }
        ],
        numOfReviews: {
            type: String,
            default: 0,
        },
        reviews: [{
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    })
const products = mongoose.model('products', productSchema)

module.exports = products