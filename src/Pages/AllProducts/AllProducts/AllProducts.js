import React, { useContext, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const AllProducts = () => {
    const products = useLoaderData();
    const [modalData, setModalData] = useState(null)
    const { user } = useContext(AuthContext);

    console.log(modalData)
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
                                        <input defaultValue={product?.product_name} disabled type="text" className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input defaultValue={product?.price} disabled type="text" className="input input-bordered" />
                                    </div>
                                </div>
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
                                <div className="modal-action">
                                    <button className='btn btn-success btn-sm'>Submit</button>
                                    <label htmlFor="my-modal" className="btn btn-sm btn-warning">Close!</label>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                {/* {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                } */}
            </div>
        </div>
    );
};

export default AllProducts;
{/* <div className="card-body">
    <div className="form-control">
        <label className="label">
            <span className="label-text">Email</span>
        </label>
        <input type="text" placeholder="email" className="input input-bordered" />
    </div>
    <div className="form-control">
        <label className="label">
            <span className="label-text">Password</span>
        </label>
        <input type="text" placeholder="password" className="input input-bordered" />
        <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
        </label>
    </div>
    <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
    </div>
</div> */}