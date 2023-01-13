import { loadStockByDate, onNewBooking } from './sockets.js';
import { renderStockByDate, onHandleSubmit, updateStock, onDateSelect } from '../utils/client-ui.js';

loadStockByDate(renderStockByDate);
onNewBooking(updateStock);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);

const inputDateSelect = document.querySelector('#date');
inputDateSelect.addEventListener('change', onDateSelect);
