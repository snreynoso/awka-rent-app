import Booking from './database/models/Booking';
import Bike from './database/models/Bike';

export default (io) => {
    io.on('connection', (socket) => {

        const emitBookings = async () => {
            const bookings = await Booking.find();
            const bikeData = await Bike.find();

            const data = { bookings, avlStock: bikeData[0].avlStock, fullStock: bikeData[0].fullStock };

            io.emit('server:loadbookings', data);
        };
        emitBookings();

        socket.on('client:newbooking', async bookingData => {
            // CHECK AVALAIBLE STOCK 
            const bikeData = await Bike.find();
            const newAvlStock = bikeData[0].avlStock - bookingData.quantity;

            if (newAvlStock < 0) {
                // REJECT BOOKING //
                socket.emit('server:notenoughstock');
                console.log('NOT ENOUGH BIKES TO RENT! ')
            } else {
                // SAVE NEW BOOKING IN DB //
                const newBooking = new Booking({
                    name: bookingData.name,
                    quantity: bookingData.quantity,
                    size: bookingData.size
                });

                const savedBooking = await newBooking.save();
                const savedStock = await Bike.updateOne({ model: 'mountainbike' }, { avlStock: newAvlStock });
                // TODO check if saved stock was Ok
                io.emit('server:newbooking', { savedBooking, avlStock: newAvlStock });
            }
        });

        socket.on('client:deletebooking', async (id) => {
            const bookingToDelete = await Booking.findById(id);
            const bikeData = await Bike.find();

            const newAvlStock = bikeData[0].avlStock + bookingToDelete.quantity;
            const updatedStock = await Bike.updateOne({ model: 'mountainbike' }, { avlStock: newAvlStock });

            await Booking.findByIdAndDelete(id);
            emitBookings();
            emitQtyOfBikes();
        });

        socket.on('client:getbooking', async (id) => {
            const booking = await Booking.findById(id);
            io.emit('server:selectedbooking', booking);
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
                    name: updatedBooking.name,
                    quantity: updatedBooking.quantity,
                    size: updatedBooking.size
                });

                await Bike.updateOne({ model: 'mountainbike' }, { avlStock: newAvlStock });
                emitBookings();
                emitQtyOfBikes();
            }

        });

        const emitQtyOfBikes = async () => {
            const dataBikes = await Bike.find();
            io.emit('server:loadqtyofbikes', dataBikes[0].avlStock);
        };
        emitQtyOfBikes();

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
            emitQtyOfBikes();
        });
    });
};
