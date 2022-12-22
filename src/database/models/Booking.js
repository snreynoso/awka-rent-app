import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    size: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Booking', schema);
