import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../utilities/Loading';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch(`https://phone-garage-server-bay.vercel.app/bookings/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    console.log(bookings)

    if (isLoading) {
        return <Loading></Loading>
    }
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
                                        booking.price && !booking.paid && <Link to={`/myorders/payment/${booking._id}`}>
                                            <button className="btn btn-primary btn-sm">Pay</button></Link>
                                    }
                                    {
                                        booking.price && booking.paid && <span className="text-primary">Paid</span>
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