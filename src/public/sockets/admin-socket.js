import { loadBookings, onNewBooking, onSelected } from './sockets.js';
import { onHandleSubmit, renderBookings, appendBooking, fillForm, onHandleFullStockUpdate } from '../utils/admin-ui.js';

loadBookings(renderBookings);
onNewBooking(appendBooking);
onSelected(fillForm);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);

const btnFullStockUpdate = document.querySelector('#btnFullStockUpdate');
btnFullStockUpdate.addEventListener('click', onHandleFullStockUpdate);

