import { loadQtyOfBikes, onNewBooking } from './sockets.js';
import { renderQtyOfBikes, onHandleSubmit, appendBooking } from '../utils/client-ui.js';

loadQtyOfBikes(renderQtyOfBikes);
onNewBooking(appendBooking);

const bookingForm = document.querySelector('#bookingForm');
bookingForm.addEventListener('submit', onHandleSubmit);
