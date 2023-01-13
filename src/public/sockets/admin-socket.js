import { 
    loadBooking, 
    onNewBooking, 
    onSelected, 
    loadFullStock,
    loadStockByDate
} from './sockets.js';

import { 
    onHandleSubmit, 
    renderBooking, 
    appendBooking, 
    fillForm, 
    onHandleFullStockUpdate, 
    renderFullStock,
    onDateSelect,
    renderStockByDate
} from '../utils/admin-ui.js';

loadBooking(renderBooking);
loadFullStock(renderFullStock);
loadStockByDate(renderStockByDate);

onNewBooking(appendBooking);
onSelected(fillForm);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);

const inputDateSelect = document.querySelector('#date');
inputDateSelect.addEventListener('change', onDateSelect);

const btnFullStockUpdate = document.querySelector('#btnFullStockUpdate');
btnFullStockUpdate.addEventListener('click', onHandleFullStockUpdate);
