import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: ALLProducts = [], refetch } = useQuery({
        queryKey: ['AllProducts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products`);
            const data = await res.json();
            return data;
        }
    })
    const sellerProducts = ALLProducts.filter(product => product.seller_email === user?.email)

    const handleAddAdvertise = product => {
        console.log(product)
    }
    return (
        <div className='min-h-screen'>
            <div className='grid grid-cols-2'>
                {
                    sellerProducts.map(product => <div className="card w-96 bg-base-100 shadow-xl mx-auto">
                        <figure><img src={product.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="text-2xl">{product.product_name}</h2>
                            <p>Product Status : {product.product_status === 'sold' ?
                                <span>Sold</span>
                                :
                                <span>Available</span>
                            }</p>
                            <p>Price : {product.price}</p>
                            <p>
                                Date of Post : {product.date.slice(0, 10)}
                            </p>
                            {product.product_status === 'sold' ?
                                <button className="btn btn-success">
                                    Sold
                                </button>
                                :
                                <button onClick={() => handleAddAdvertise(product)} className="btn btn-success">
                                    Advertise
                                </button>
                            }

                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProducts;