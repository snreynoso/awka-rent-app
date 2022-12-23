import { deleteBooking, getBookingById, saveBooking, updateBooking, updateFullStock } from '../sockets/sockets.js';

const bookingsList = document.querySelector('#bookings');
const name = document.querySelector('#name');
const quantity = document.querySelector('#quantity');
const size = document.querySelector('#size');

let saveId = '';

const bookingUI = booking => {
    const div = document.createElement('div')
    div.innerHTML = `
        <div class="row container rounded-2 border m-0 mt-1 p-2 d-flex justify-content-between">
            <div class="col-4">
                <p>Name: ${booking.name}</p>
            </div>
            
            <div class="col-3">
                <p>Qty: ${booking.quantity}</p>
            </div>

            <div class="col-3">
                <p>Size: ${booking.size}</p>
            </div>
            
            <div class="col-2">
                <button class="update btn btn-primary" data-id="${booking._id}">Update</button>
                <button class="delete btn btn-danger" data-id="${booking._id}">Delete</button>
            </div>
        </div>
    `;

    const btnDelete = div.querySelector('.delete');
    btnDelete.addEventListener('click', e => deleteBooking(btnDelete.dataset.id));

    const btnUpdate = div.querySelector('.update');
    btnUpdate.addEventListener('click', e => getBookingById(btnUpdate.dataset.id));

    return div;
};

export const renderBookings = ({ bookings, avlStock, fullStock }) => {
    const avlStockInput = document.querySelector('#basic-addon2');
    avlStockInput.innerHTML = `of ${avlStock} available`;

    const fullStockInput = document.querySelector('#fullStock');
    fullStockInput.value = fullStock;

    bookingsList.innerHTML = '';
    bookings.forEach(booking => bookingsList.append(bookingUI(booking)));
};

export const onHandleSubmit = event => {
    event.preventDefault();

    if (saveId) {
        updateBooking(saveId, name.value, quantity.value, size.value);
    } else {
        saveBooking(name.value, quantity.value, size.value);
    }

    name.value = '';
    quantity.value = '';
    size.value = '';
    saveId = '';
};

export const fillForm = booking => {
    name.value = booking.name;
    quantity.value = booking.quantity;
    size.value = booking.size;
    saveId = booking._id;
};

export const appendBooking = data => {
    const qtyInput = document.querySelector('#basic-addon2');
    qtyInput.innerHTML = `of ${data.avlStock} available`;

    bookingsList.append(bookingUI(data.savedBooking, data.avlStock));
};

export const onHandleFullStockUpdate = event => {
    const qtyToUpdate = document.querySelector('#fullStock').value;
    updateFullStock(qtyToUpdate);
}