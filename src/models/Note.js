import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: {
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

export default model('Note', schema);
