import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AllProducts = () => {
    const products = useLoaderData();
    const [modalData, setModalData] = useState(null);
    const { user } = useContext(AuthContext);
    const handleBookingProduct = event => {
        event.preventDefault();
        const buyer_number = event.target.buyer_number.value;
        const buyer_location = event.target.buyer_location.value;
        const bookingInformation = {
            ...modalData, buyer_number, buyer_location,
            modal_id: modalData._id,
            email: user?.email
        }
        console.log(bookingInformation)

        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInformation)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Item is booked successfully')
            })
    }
    const handleReportItem = (product) => {
        const report = { ...product, reporter_email: user?.email }
        fetch('http://localhost:5000/reported', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Reported Successfully')
            })
    }
    return (
        <div className='min-h-screen mt-20 mx-8'>
            <div className='lg:grid grid-cols-2 gap-5 '>
                {
                    products.map(product => <div className='mx-auto card bg-slate-200 shadow-2xl'>
                        <div className="card card-side ">
                            <figure><img className='w-72' src={product.image} alt="Movie" /></figure>
                            <div className="card-body text-left font-bold">

                                <h3 className="text-2xl">{product.product_name}</h3>
                                <div className='lg:flex gap-2'>
                                    <p>Resale Price : ${product.price}</p>
                                    <p>Original Price  ${product.original_price}</p>
                                </div>
                                <p>Product Condition : {product.condition}</p>
                                <p>Purchase Year : {product.purchase_date}</p>
                                <p>Seller Location : {product.location}</p>
                                <button onClick={() => handleReportItem(product)} className="btn btn-sm btn-red">Report to Admin</button>
                            </div>
                        </div>
                        <div className="card-body text-left">
                            <p>Discription : {product.discription}</p>
                            <div className='flex'>
                                <p className='flex'>Seller Name :
                                    <span className='flex items-center'>
                                        {product.seller_name} {product?.seller_status === 'verified' && <FaCheck className='text-blue-500' />}
                                    </span>
                                </p>
                                <p>Seller Email : {product.seller_email}</p>
                            </div>
                            <div className='flex'>
                                <p>Seller Phone : {product.number}</p>
                                <p>Date Of Post : {product.date.slice(0, 10)}</p>
                            </div>
                        </div>
                        {/* {
                        seller?.status === 'verified' && <p className='text-center'>Added by Verified Seller</p>
                    } */}
                        <label onClick={() => setModalData(product)} htmlFor="my-modal" className="btn btn-success w-full">Book Now</label>

                        <input type="checkbox" id="my-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box p-2">
                                <div className='grid grid-cols-2 gap-3'>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Your Name</span>
                                        </label>
                                        <input defaultValue={user?.displayName} disabled type="text" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Your Email</span>
                                        </label>
                                        <input defaultValue={user?.email} disabled type="text" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Product Name</span>
                                        </label>
                                        <input defaultValue={modalData?.product_name} disabled type="text" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input defaultValue={modalData?.price} disabled type="text" className="input input-bordered" />
                                    </div>
                                </div>
                                <form onSubmit={handleBookingProduct}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Your Phone Number</span>
                                        </label>
                                        <input type="text" name='buyer_number' placeholder='Enter Your Phone Number' className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Meeting Location</span>
                                        </label>
                                        <input type="text" name='buyer_location' placeholder='Enter Location Where Meet You' className="input input-bordered" />
                                    </div>
                                    <div className='flex justify-end mt-2'>
                                        <button htmlFor="my-modal" className='btn btn-success btn-sm'>Submit</button>
                                    </div>
                                </form>
                                <div className="modal-action">
                                    <label htmlFor="my-modal" className="btn btn-sm btn-warning">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div >
    );
};

export default AllProducts;
