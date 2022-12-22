import Booking from './database/models/Booking';
import Bike from './database/models/Bike';

export default (io) => {
    io.on('connection', (socket) => {

        const emitBookings = async () => {
            const bookings = await Booking.find();
            const qtyOfBikes = await Bike.find();
            const data = {bookings, qtyOfBikes: qtyOfBikes[0].quantity};
              
            io.emit('server:loadbookings', data);
        };
        emitBookings();
    
        socket.on('client:newbooking', async bookingData => {
            const newBooking = new Booking({
                name: bookingData.name,
                quantity: bookingData.quantity,
                size: bookingData.size
            });

            const savedBooking = await newBooking.save();
            // socket.emit('server:newbooking', savedBooking);    // Socket solo re responderia a ese cocket cliente
            // io.emit('server:newbooking', savedBooking);       // io le reenvia a toodos los clientes!
            
            const qtyOfBikes = await Bike.find();
            const data = {savedBooking, qtyOfBikes: qtyOfBikes[0].quantity};

            io.emit('server:newbooking', data);      
        });

        socket.on('client:deletebooking', async (id) => {
            await Booking.findByIdAndDelete(id);
            emitBookings();
        });

        socket.on('client:getbooking', async (id) => {
            const booking = await Booking.findById(id);
            io.emit('server:selectedbooking', booking);
        });

        socket.on('client:updatebooking', async (updatedBooking) => {
            await Booking.findByIdAndUpdate(updatedBooking._id, {
                name: updatedBooking.name,
                quantity: updatedBooking.quantity,
                size: updatedBooking.size
            });

            emitBookings();
        });

        const emitQtyOfBikes = async () => {
            const qtyOfBikes = await Bike.find();
            io.emit('server:loadqtyofbikes', qtyOfBikes[0].quantity);
        };
        emitQtyOfBikes();        
    });
};
