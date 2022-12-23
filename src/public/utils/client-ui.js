import { saveBooking } from '../sockets/sockets.js';

const name = document.querySelector('#name');
const quantity = document.querySelector('#quantity');
const size = document.querySelector('#size');

export const renderQtyOfBikes = qtyOfBikes => {
    const qtyInput = document.querySelector('#basic-addon2');
    qtyInput.innerHTML = `of ${qtyOfBikes} available`;
};

export const onHandleSubmit = event => {
    event.preventDefault();
    
    saveBooking(name.value, quantity.value, size.value);

    name.value = '';
    quantity.value = '';
    size.value = '';
};

export const updateStock = data => {
    const qtyInput = document.querySelector('#basic-addon2');
    qtyInput.innerHTML = `of ${data.avlStock} available`;
};
