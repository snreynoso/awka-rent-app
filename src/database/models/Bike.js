import { Schema, model } from 'mongoose';

const schema = new Schema({
    model: {
        type: String,
        required: true
    },
    quantity: {
        type: Number
    },
    text: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Bike', schema);