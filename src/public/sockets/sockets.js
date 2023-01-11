const socket = io();

export const loadBookings = callback => {
    socket.on('server:loadbookings', callback);
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

export const updateBooking = (id, name, quantity, size, date) => {
    socket.emit('client:updatebooking', {
        _id: id,
        name,
        quantity,
        size,
        date
    })
};

// export const loadQtyOfBikes = callback => {
//     socket.on('server:loadqtyofbikes', callback);
// };

export const loadBikeStock = callback => {
    socket.on('server:stockbydate', callback);
}

export const updateFullStock = qtyToUpdate => {
    socket.emit('client:updatefullstock', qtyToUpdate);
};

export const dateSelected = date => {
    socket.emit('client:dateselected', date);
};

socket.on('server:notenoughstock', () => {
    console.log('NOT ENOUGH BIKES TO RENT!');
    alert('NOT ENOUGH BIKES TO RENT!');
});
