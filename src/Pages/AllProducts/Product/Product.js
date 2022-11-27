import React, { useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Product = ({ product }) => {
    const [seller, setSeller] = useState({})
    const { product_name, price, condition, number, location, discription, purchase_date, image, date, seller_name, seller_email, original_price } = product;

    useEffect(() => {
        fetch(`http://localhost:5000/seller/${seller_email}`)
            .then(res => res.json())
            .then(data => {
                setSeller(data)
            })
    }, [seller_email])
    console.log(seller)
    return (
        <div className='mx-auto card bg-slate-200 shadow-2xl'>
            <div className="card card-side ">
                <figure><img className='w-72' src={image} alt="Movie" /></figure>
                <div className="card-body text-left font-bold">
                    <h3 className="text-2xl">{product_name}</h3>
                    <div className='lg:flex gap-2'>
                        <p>Resale Price : ${price}</p>
                        <p>Original Price  ${original_price}</p>
                    </div>
                    <p>Product Condition : {condition}</p>
                    <p>Purchase Year : {purchase_date}</p>
                    <p>Seller Location : {location}</p>
                </div>
            </div>
            <div className="card-body text-left">
                <p>Discription : {discription}</p>
                <div className='flex'>
                    <p className='flex'>Seller Name :
                        <span className='flex items-center'>
                            {seller_name} {seller?.status === 'verified' && <FaCheck className='text-blue-500' />}
                        </span>
                    </p>
                    <p>Seller Email : {seller_email}</p>
                </div>
                <div className='flex'>
                    <p>Seller Phone : {number}</p>
                    <p>Date Of Post : {date.slice(0, 10)}</p>
                </div>
            </div>
            {
                seller?.status === 'verified' && <p className='text-center'>Added by Verified Seller</p>
            }
            <button className="btn btn-success w-full">Book Now</button>
        </div>
    );
};

export default Product;