import { Schema, model } from 'mongoose';

const schema = new Schema({
    model: {
        type: String,
        required: true
    },
    fullStock: {
        type: Number
    },
    avlStock: {
        type: Number
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Bike', schema);