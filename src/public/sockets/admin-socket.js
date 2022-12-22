import { loadBookings, onNewBooking, onSelected } from './sockets.js';
import { onHandleSubmit, renderBookings, appendBooking, fillForm } from '../utils/admin-ui.js';

loadBookings(renderBookings);
onNewBooking(appendBooking);
onSelected(fillForm);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);
