import Booking from '../database/models/Booking';
import Bike from '../database/models/Bike';

export const getStockByDate = async (date) => {
    let smallQtyOfDate  = 0;
    let mediumQtyOfDate = 0;
    let largeQtyOfDate  = 0;

    const filterSizes   = 'smallQty mediumQty largeQty';
    const bookingByDate = await Booking.find({ date }).select(filterSizes);
    
    const filterStock = 'smallFullStock mediumFullStock largeFullStock';
    const fullStock   = await Bike.find().select(filterStock);

    bookingByDate.forEach(booking => {
        smallQtyOfDate  += booking.smallQty;
        mediumQtyOfDate += booking.mediumQty;
        largeQtyOfDate  += booking.largeQty;
    });

    const stockByDate = { 
        smallStock:  (fullStock[0].smallFullStock  - smallQtyOfDate), 
        mediumStock: (fullStock[0].mediumFullStock - mediumQtyOfDate), 
        largeStock:  (fullStock[0].largeFullStock  - largeQtyOfDate) 
    };

    return stockByDate;
};
