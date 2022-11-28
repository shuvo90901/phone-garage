import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings`);
            const data = await res.json();
            return data;
        }
    })
    console.log(bookings)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, i) => <tr>
                                <th>{i + 1}</th>
                                <td><img className='w-20' src={booking?.image} alt="" /></td>
                                <td>{booking?.product_name}</td>
                                <td>$ {booking?.price}</td>
                                <td>
                                    {
                                        !booking.paid && <Link to={`/myorders/payment/${booking.modal_id}`}>
                                            <button className="btn btn-primary btn-sm">Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.paid && <span className='text-primary'>
                                            Paid
                                        </span>
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;