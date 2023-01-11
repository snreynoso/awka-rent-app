import { Schema, model } from 'mongoose';

const schema = new Schema({
    model: {
        type: String,
        required: true
    },
    smallFullStock: {
        type: Number
    },
    smallAvlStock: {
        type: Number
    },
    mediumFullStock: {
        type: Number
    },
    mediumAvlStock: {
        type: Number
    },
    largeFullStock: {
        type: Number
    },
    largeAvlStock: {
        type: Number
    },
    description: {
        type: String
    }
}, {
    timestamps: true
});

export default model('Bike', schema);