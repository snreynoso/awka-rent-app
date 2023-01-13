import Booking from './database/models/Booking';
import Bike from './database/models/Bike';
import { getStockByDate } from './utils/getStockByDate';

export default (io) => {
    io.on('connection', (socket) => {

        const emitBookingData = async () => {
            const bookingData = await Booking.find();
            io.emit('server:bookingdata', bookingData);
        };
        emitBookingData();
        
        const emitBikeData = async () => {
            const bikeData = await Bike.find();
            io.emit('server:bikedata', bikeData[0]);
        };
        emitBikeData();

        socket.on('client:newbooking', async (bookingData) => {           
            const stockByDate = await getStockByDate(bookingData.date);

            const smallCheckStock  = stockByDate.smallStock  - bookingData.smallQty;
            const mediumCheckStock = stockByDate.mediumStock - bookingData.mediumQty;
            const largeCheckStock  = stockByDate.largeStock  - bookingData.largeQty;

            if (smallCheckStock < 0 || mediumCheckStock < 0 || largeCheckStock < 0) {
                // REJECT BOOKING //
                socket.emit('server:notenoughstock');
                console.log('NOT ENOUGH BIKES TO RENT! ')
            } else {
                // SAVE NEW BOOKING IN DB //
                const newBooking = new Booking(bookingData);
               
                try {
                    const savedBooking = await newBooking.save();

                    if(savedBooking) {
                        socket.emit('server:newbookingsaved');
                        console.log('New booking saved!');
                    }

                    emitBookingData();
                } catch (error) {
                    socket.emit('server:newbookingfailed');
                    console.log(error.name);
                }
            }
        });

        socket.on('client:deletebooking', async (id) => {
            const bookingDeleted = await Booking.findByIdAndDelete(id).select('name');
            
            console.log(`User ${bookingDeleted.name} was deleted!`);
            socket.emit('server:bookingdeleted', bookingDeleted.name);
            
            
            emitBookingData();
        });

        socket.on('client:getbooking', async (id) => {
            const booking = await Booking.findById(id);
            // io.emit('server:selectedbooking', booking);
            socket.emit('server:selectedbooking', booking);
        });

        socket.on('client:updatebooking', async (bookingData) => {

            const stockByDate = await getStockByDate(bookingData.date);

            const smallCheckStock  = stockByDate.smallStock  - bookingData.smallQty;
            const mediumCheckStock = stockByDate.mediumStock - bookingData.mediumQty;
            const largeCheckStock  = stockByDate.largeStock  - bookingData.largeQty;

            if (smallCheckStock < 0 || mediumCheckStock < 0 || largeCheckStock < 0) {
                // REJECT BOOKING //
                socket.emit('server:notenoughstock');
                console.log('NOT ENOUGH BIKES TO RENT! ')
            } else {
                // UPDATE BOOKING IN DB //
                try {
                    const updatedBooking = await Booking.findByIdAndUpdate(bookingData._id, {
                        name:      bookingData.name,
                        smallQty:  bookingData.smallQty,
                        mediumQty: bookingData.mediumQty,
                        largeQty:  bookingData.largeQty,
                        date:      bookingData.date
                    });

                    if(updatedBooking) {
                        socket.emit('server:newbookingsaved');
                        console.log('New booking updated!');
                    }

                    emitBookingData();
                } catch (error) {
                    socket.emit('server:newbookingfailed');
                    console.log(error.name);
                }
            }
        });

        socket.on('client:updatefullstock', async (qtyToUpdate) => {
            await Bike.updateOne(
                {model: 'mountainbike'},
                {
                    smallFullStock:  qtyToUpdate.smallUpdate,
                    mediumFullStock: qtyToUpdate.mediumUpdate,
                    largeFullStock:  qtyToUpdate.largeUpdate
                }
            )
            emitBikeData();
        });

        socket.on('client:dateselected', async (date) => {
            const stockByDate = await getStockByDate(date);
            socket.emit('server:stockbydate', stockByDate);
        });
    });
};
