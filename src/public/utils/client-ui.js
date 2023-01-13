import { saveBooking, dateSelected } from '../sockets/sockets.js';

const name      = document.querySelector('#name');
const smallQty  = document.querySelector('#s-qty');
const mediumQty = document.querySelector('#m-qty');
const largeQty  = document.querySelector('#l-qty');
const date      = document.querySelector('#date');

const smallQtyAddon  = document.querySelector('#s-qty-addon');
const mediumQtyAddon = document.querySelector('#m-qty-addon');
const largeQtyAddon  = document.querySelector('#l-qty-addon');

export const renderStockByDate = qtyOfBikes => {
    smallQtyAddon.innerHTML  = `${qtyOfBikes.smallStock} available SMALL Size`;
    mediumQtyAddon.innerHTML = `${qtyOfBikes.mediumStock} available MEDIUM Size`;
    largeQtyAddon.innerHTML  = `${qtyOfBikes.largeStock} available LARGE Size`;
};

export const onHandleSubmit = event => {
    event.preventDefault();

    const booking = {
        name: name.value, 
        smallQty: smallQty.value, 
        mediumQty: mediumQty.value, 
        largeQty: largeQty.value, 
        date: date.value
    };
   
    saveBooking(booking);

    name.value      = '';
    smallQty.value  = 0;
    mediumQty.value = 0;
    largeQty.value  = 0;
    date.value      = '';

    smallQtyAddon.innerHTML  = '-- available SMALL Size';
    mediumQtyAddon.innerHTML = '-- available MEDIUM Size';
    largeQtyAddon.innerHTML  = '-- available LARGE Size';
};

// TODO Actualizar
export const updateStock = data => {
    // const qtyInput = document.querySelector('#basic-addon2');
    // qtyInput.innerHTML = `of ${data.avlStock} available`;
};

export const onDateSelect = () => {
    dateSelected(date.value); 
}
