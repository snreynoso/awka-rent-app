import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    smallQty: {
        type: Number,
        required: true,
    },
    mediumQty: {
        type: Number,
        required: true,
    },
    largeQty: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default model('Booking', schema);
