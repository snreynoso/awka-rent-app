import Booking from './database/models/Booking';
import Bike from './database/models/Bike';
import { getStockByDate } from './utils/getStockByDate';

export default (io) => {
    io.on('connection', (socket) => {

        const emitBookings = async () => {
            const bookings = await Booking.find();
            const bikeData = await Bike.find();

            const data = { bookings, avlStock: bikeData[0].avlStock, fullStock: bikeData[0].fullStock };

            io.emit('server:loadbookings', data);
        };
        emitBookings();

        // const emitQtyOfBikes = async () => {
        //     const filter = 'smallFullStock smallAvlStock mediumFullStock mediumAvlStock largeFullStock largeAvlStock';
        //     const qtyOfBikes = await Bike.find().select(filter);
        //     io.emit('server:loadqtyofbikes', qtyOfBikes[0]);
        // };
        // emitQtyOfBikes();

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
                const savedBooking = await newBooking.save();
                
                // TODO check if saved stock was Ok

                io.emit('server:newbooking', { savedBooking });

                // TODO CONTINUAR DESDE ACA PARA ACTUALIZAR PANEL ADMIN
            }
        });

        socket.on('client:deletebooking', async (id) => {
            const bookingToDelete = await Booking.findById(id);
            const bikeData = await Bike.find();

            const newAvlStock = bikeData[0].avlStock + bookingToDelete.quantity;
            const updatedStock = await Bike.updateOne({ model: 'mountainbike' }, { avlStock: newAvlStock });

            await Booking.findByIdAndDelete(id);
            emitBookings();
            // emitQtyOfBikes();
        });

        socket.on('client:getbooking', async (id) => {
            const booking = await Booking.findById(id);
            // io.emit('server:selectedbooking', booking);
            socket.emit('server:selectedbooking', booking);
        });

        socket.on('client:updatebooking', async (updatedBooking) => {
            // CHECK AVALAIBLE STOCK 
            const bikeData = await Bike.find();
            const prevQtyBooked = await Booking.findById(updatedBooking._id);

            const newAvlStock = bikeData[0].avlStock + prevQtyBooked.quantity - updatedBooking.quantity;

            if (newAvlStock < 0) {
                // REJECT BOOKING //
                console.log('NOT ENOUGH BIKES TO RENT! ');
                socket.emit('server:notenoughstock');
            } else {
                // UPDATE BOOKING IN DB //
                await Booking.findByIdAndUpdate(updatedBooking._id, {
                    name:     updatedBooking.name,
                    quantity: updatedBooking.quantity,
                    size:     updatedBooking.size,
                    date:     updatedBooking.date
                });

                await Bike.updateOne({ model: 'mountainbike' }, { avlStock: newAvlStock });
                emitBookings();
                // emitQtyOfBikes();
            }
        });

        socket.on('client:updatefullstock', async (qtyToUpdate) => {
            const dataBikes = await Bike.find();
            const newAvlStock = dataBikes[0].avlStock - (dataBikes[0].fullStock - parseInt(qtyToUpdate));

            await Bike.updateOne(
                { model: 'mountainbike' },
                {
                    avlStock: newAvlStock,
                    fullStock: qtyToUpdate
                }
            );

            emitBookings();
            // emitQtyOfBikes();
        });

        socket.on('client:dateselected', async (date) => {
            const stockByDate = await getStockByDate(date);
            socket.emit('server:stockbydate', stockByDate);
        });
    });
};
