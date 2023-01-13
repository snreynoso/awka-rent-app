const socket = io();

export const loadBooking = callback => {
    socket.on('server:bookingdata', callback);
};

export const loadFullStock = callback => {
    socket.on('server:bikedata', callback);
};

export const saveBooking = (booking) => {
    socket.emit('client:newbooking', booking);
};

export const onNewBooking = callback => {
    socket.on('server:newbooking', callback);
};

export const deleteBooking = id => {
    socket.emit('client:deletebooking', id);
};

export const getBookingById = id => {
    socket.emit('client:getbooking', id);
};

export const onSelected = callback => {
    socket.on('server:selectedbooking', callback);
};

export const updateBooking = (newBooking) => {
    socket.emit('client:updatebooking', newBooking)
};

export const updateFullStock = qtyToUpdate => {
    socket.emit('client:updatefullstock', qtyToUpdate);
};

export const dateSelected = date => {
    socket.emit('client:dateselected', date);
};

export const loadStockByDate = callback => {
    socket.on('server:stockbydate', callback);
}

socket.on('server:notenoughstock', () => {
    console.log('NOT ENOUGH BIKES TO RENT!');
    alert('NOT ENOUGH BIKES TO RENT!');
});

socket.on('server:newbookingsaved', () => {
    console.log('Booking saved Ok!');
    alert('Booking saved Ok!')
})

socket.on('server:newbookingfailed', () => {
    console.log('New booking failed!');
    alert('New booking failed!')
})

socket.on('server:bookingdeleted', (name) => {
    console.log(`${name}'s booking deleted!`);
    alert(`${name}'s booking deleted!`)
});