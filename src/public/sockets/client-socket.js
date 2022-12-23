import { loadQtyOfBikes, onNewBooking } from './sockets.js';
import { renderQtyOfBikes, onHandleSubmit, updateStock } from '../utils/client-ui.js';

loadQtyOfBikes(renderQtyOfBikes);
onNewBooking(updateStock);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);
