import { saveBooking, dateSelected } from '../sockets/sockets.js';

const name      = document.querySelector('#name');
const smallQty  = document.querySelector('#s-qty');
const mediumQty = document.querySelector('#m-qty');
const largeQty  = document.querySelector('#l-qty');
const date      = document.querySelector('#date');

export const renderQtyOfBikes = qtyOfBikes => {
    const qtySmallInput  = document.querySelector('#s-qty-addon');
    const qtyMediumInput = document.querySelector('#m-qty-addon');
    const qtyLargeInput  = document.querySelector('#l-qty-addon');

    qtySmallInput.innerHTML  = `${qtyOfBikes.smallStock} available SMALL Size`;
    qtyMediumInput.innerHTML = `${qtyOfBikes.mediumStock} available MEDIUM Size`;
    qtyLargeInput.innerHTML  = `${qtyOfBikes.largeStock} available LARGE Size`;
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
    smallQty.value  = '';
    mediumQty.value = '';
    largeQty.value  = '';
    date.value      = '';
};

// TODO Actualizar
export const updateStock = data => {
    // const qtyInput = document.querySelector('#basic-addon2');
    // qtyInput.innerHTML = `of ${data.avlStock} available`;
};

export const onDateSelect = () => {
    dateSelected(date.value); 
}
