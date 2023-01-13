import { 
    deleteBooking, 
    getBookingById, 
    saveBooking, 
    updateBooking, 
    updateFullStock,
    dateSelected 
} from '../sockets/sockets.js';

const name = document.querySelector('#name');
const date = document.querySelector('#date');

const bookingList = document.querySelector('#booking');

const addonSmallFullStock  = document.querySelector('#fs-addon2');
const addonMediumFullStock = document.querySelector('#fm-addon2');
const addonLargeFullStock  = document.querySelector('#fl-addon2');

const inputSmallFullStock  = document.querySelector('#smallFullStock');
const inputMediumFullStock = document.querySelector('#mediumFullStock');
const inputLargeFullStock  = document.querySelector('#largeFullStock');

const smallQty  = document.querySelector('#s-qty');
const mediumQty = document.querySelector('#m-qty');
const largeQty  = document.querySelector('#l-qty');

// Delete
const quantity = document.querySelector('#quantity');
const size = document.querySelector('#size');
// Delete

let saveId = '';

const bookingUI = booking => {

    const formatDate = booking.date.slice(0, 10);
    const div = document.createElement('div');

    div.innerHTML = `
        <div class="row container rounded-2 border m-0 mt-1 p-2 d-flex justify-content-evenly">
            <div class="col-md-2">
                <p>Name: ${booking.name}</p>
            </div>
            
            <div class="col-md-2">
                <p>S: ${booking.smallQty},  M: ${booking.mediumQty},  L: ${booking.largeQty}</p>
            </div>
            
            <div class="col-md-3">
                <p>Date: ${formatDate}</p>
            </div>
            
            <div class="col-md-3 ">
                <div class="d-flex justify-content-md-evenly">
                    <button class="update btn btn-primary" data-id="${booking._id}">Update</button>
                    <button class="delete btn btn-danger ms-2" data-id="${booking._id}">Delete</button>
                </div>
            </div>
        </div>
    `;

    const btnDelete = div.querySelector('.delete');
    btnDelete.addEventListener('click', e => deleteBooking(btnDelete.dataset.id));

    const btnUpdate = div.querySelector('.update');
    btnUpdate.addEventListener('click', e => getBookingById(btnUpdate.dataset.id));

    return div;
};

export const renderBooking = (bookingData) => {
    bookingList.innerHTML = '';
    bookingData.forEach(booking => bookingList.append(bookingUI(booking)));
};

export const renderFullStock = (bikeData) => {
    addonSmallFullStock.innerHTML  = `Full Stock of Small: ${bikeData.smallFullStock}`;
    addonMediumFullStock.innerHTML = `Full Stock of Medium: ${bikeData.mediumFullStock}`;
    addonLargeFullStock.innerHTML  = `Full Stock of Large: ${bikeData.largeFullStock}`;

    inputSmallFullStock.value  = bikeData.smallFullStock;
    inputMediumFullStock.value = bikeData.mediumFullStock;
    inputLargeFullStock.value  = bikeData.largeFullStock;
};

export const onHandleSubmit = event => {
    event.preventDefault();

    if (saveId) {
        const newBooking = {
            _id: saveId, 
            name: name.value, 
            smallQty: smallQty.value, 
            mediumQty: mediumQty.value, 
            largeQty: largeQty.value , 
            date: date.value.slice(0, 10)
        }

        updateBooking(newBooking);
    } else {
        const booking = {
            name: name.value, 
            smallQty: smallQty.value, 
            mediumQty: mediumQty.value, 
            largeQty: largeQty.value, 
            date: date.value
        };
       
        saveBooking(booking);
    }

    name.value      = '';
    smallQty.value  = '';
    mediumQty.value = '';
    largeQty.value  = '';
    date.value      = '';
    saveId          = '';
};

export const fillForm = booking => {
    
    name.value     = booking.name;
    smallQty.value = booking.smallQty;
    mediumQty.value= booking.mediumQty;
    largeQty.value = booking.largeQty;
    date.value     = booking.date.slice(0, 10);
    saveId         = booking._id;
};

export const appendBooking = data => {

    console.log(data.saveBooking)

    // bookingsList.append(bookingUI(data.savedBooking, data.avlStock));
};

export const onHandleFullStockUpdate = (event) => {
    event.preventDefault();

    // const smallUpdate  = document.querySelector('#smallFullStock').value;
    // const mediumUpdate = document.querySelector('#mediumFullStock').value;
    // const largeUpdate  = document.querySelector('#largeFullStock').value;

    const qtyToUpdate = {
        smallUpdate:  inputSmallFullStock.value, 
        mediumUpdate: inputMediumFullStock.value,
        largeUpdate:  inputLargeFullStock.value 
    }

    updateFullStock(qtyToUpdate);
}

export const renderStockByDate = qtyOfBikes => {
    const qtySmallInput  = document.querySelector('#s-qty-addon');
    const qtyMediumInput = document.querySelector('#m-qty-addon');
    const qtyLargeInput  = document.querySelector('#l-qty-addon');

    qtySmallInput.innerHTML  = `${qtyOfBikes.smallStock} available SMALL Size`;
    qtyMediumInput.innerHTML = `${qtyOfBikes.mediumStock} available MEDIUM Size`;
    qtyLargeInput.innerHTML  = `${qtyOfBikes.largeStock} available LARGE Size`;
};

export const onDateSelect = () => {
    dateSelected(date.value); 
}
