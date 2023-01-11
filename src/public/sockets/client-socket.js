import { loadBikeStock, onNewBooking } from './sockets.js';
import { renderQtyOfBikes, onHandleSubmit, updateStock, onDateSelect } from '../utils/client-ui.js';

loadBikeStock(renderQtyOfBikes);
onNewBooking(updateStock);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);

const inputDateSelect = document.querySelector('#date');
inputDateSelect.addEventListener('change', onDateSelect);
