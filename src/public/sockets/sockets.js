const socket = io();

export const loadBookings = callback => {
    socket.on('server:loadbookings', callback);
};

export const saveBooking = (name, quantity, size) => {
    socket.emit('client:newbooking', {
        name,
        quantity,
        size
    });
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

export const updateBooking = (id, name, quantity, size) => {
    socket.emit('client:updatebooking', {
        _id: id,
        name,
        quantity,
        size
    })
};

export const loadQtyOfBikes = callback => {
    socket.on('server:loadqtyofbikes', callback);
};

export const updateFullStock = qtyToUpdate => {
    socket.emit('client:updatefullstock', qtyToUpdate);
};


socket.on('server:notenoughstock', () => {
    console.log('NOT ENOUGH BIKES TO RENT!');
    alert('NOT ENOUGH BIKES TO RENT!');
});
