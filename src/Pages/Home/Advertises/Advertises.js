import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Loading from '../../utilities/Loading';

const Advertises = () => {
    const { data: advertises = [], isLoading } = useQuery({
        queryKey: ['advertises'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/advertises');
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(advertises)
    return (
        <div className='min-h-screen mt-20 mx-8'>
            <div className='lg:grid grid-cols-2 gap-5 '>
                {
                    advertises.map(advertise => <div className='mx-auto card bg-slate-200 shadow-2xl'>
                        <div className="card card-side ">
                            <figure><img className='w-72' src={advertise.image} alt="Movie" /></figure>
                            <div className="card-body text-left font-bold">
                                <h3 className="text-2xl">{advertise.product_name}</h3>
                                <div className='lg:flex gap-2'>
                                    <p>Resale Price : ${advertise.price}</p>
                                    <p>Original Price  ${advertise.original_price}</p>
                                </div>
                                <p>Product Condition : {advertise.condition}</p>
                                <p>Purchase Year : {advertise.purchase_date}</p>
                                <p>Seller Location : {advertise.location}</p>
                            </div>
                        </div>
                        <div className="card-body text-left">
                            <p>Discription : {advertise.discription}</p>
                            <div className='flex'>
                                <p className='flex'>Seller Name :
                                    <span className='flex items-center'>
                                        {advertise.seller_name} {advertise?.seller_status === 'verified' && <FaCheck className='text-blue-500' />}
                                    </span>
                                </p>
                                <p>Seller Email : {advertise.seller_email}</p>
                            </div>
                            <div className='flex'>
                                <p>Seller Phone : {advertise.number}</p>
                                <p>Date Of Post : {advertise.date.slice(0, 10)}</p>
                            </div>
                        </div>

                        <Link to={`/category/${advertise.category_id}`} className="btn btn-success w-full">Book Now</Link>


                    </div>)
                }
            </div>
        </div >
    );
};

export default Advertises;