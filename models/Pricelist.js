const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PriceListSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    periods: [
        {
            periodName: {
                type: String,
                required: true
            },
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            },
            prices: {
                type: Object,
                required: true
            }
        }
    ]
});

module.exports = PriceList = mongoose.model('priceList', PriceListSchema);